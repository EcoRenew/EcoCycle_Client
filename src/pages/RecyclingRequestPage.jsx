import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Minus, Plus, Calendar, Clock, Trash2, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// API base (normalize to include one trailing /api)
const envBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const apiBase = envBase.endsWith('/api') ? envBase : `${envBase.replace(/\/$/, '')}/api`;

const RecyclingRequestPage = () => {
  const { user, token, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  // image upload not used yet (removed setter)
  const [expandedMaterial, setExpandedMaterial] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    pickupDate: "",
    preferredTime: "",
    notes: ""
  });
  const [addresses, setAddresses] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPhoneId, setSelectedPhoneId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [showAddPhoneForm, setShowAddPhoneForm] = useState(false);
  const [newAddressStreet, setNewAddressStreet] = useState('');
  const [newAddressCity, setNewAddressCity] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);
  const [isCreatingPhone, setIsCreatingPhone] = useState(false);
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // materials fetched from backend
  const [materials, setMaterials] = useState([]);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [materialsError, setMaterialsError] = useState(null);

  useEffect(() => {
    // Set user name from authenticated user data
    if (user && user.name) {
      setFormData(prev => ({ ...prev, fullName: user.name }));
    }
  }, [user]);

  useEffect(() => {
    // Fetch materials from the backend API on mount
    const fetchMaterials = async () => {
      setIsLoadingMaterials(true);
      setMaterialsError(null);
      try {
        const res = await fetch(`${apiBase}/materials`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // Expecting response.data => array of materials with category relationship
        const data = json.data || json;

        // Transform backend materials into the shape the UI expects
        const transformed = data.map((m) => ({
          id: m.material_id ? String(m.material_id) : String(m.id || m.material_name),
          name: m.material_name || m.name || `Material ${m.material_id}`,
          image: m.image || (m.category && m.category.image) || `/images/${(m.material_name || m.name || 'material').toString().toLowerCase().replace(/\s+/g,'-')}.jpg`,
          items: [
            {
              id: m.material_id ? `item-${m.material_id}` : `item-${m.id || m.material_name}`,
              name: m.material_name || m.name,
              price: parseFloat(m.price_per_unit || m.price || 0),
              unit: m.unit || 'pieces',
              description: m.description || ''
            }
          ]
        }));

        // Group by category if backend returns materials flat with category objects
        // If backend returns categories with nested materials, try to use that
        // Check first item for category
        if (data.length > 0 && data[0].category) {
          // Group materials by category
          const grouped = {};
          data.forEach((mat) => {
            const cat = mat.category;
            const catId = cat.category_id || cat.id || cat.name;
            if (!grouped[catId]) {
              grouped[catId] = {
                id: String(catId),
                name: cat.category_name || cat.name || 'Category',
                image: cat.image || `/images/${(cat.category_name || cat.name || 'category').toString().toLowerCase().replace(/\s+/g,'-')}.jpg`,
                items: []
              };
            }
            grouped[catId].items.push({
              id: mat.material_id ? String(mat.material_id) : String(mat.id || mat.material_name),
              name: mat.material_name,
              price: parseFloat(mat.price_per_unit || mat.price || 0),
              unit: mat.unit || 'pieces',
              description: mat.description || ''
            });
          });
          setMaterials(Object.values(grouped));
        } else {
          setMaterials(transformed);
        }

      } catch (err) {
        console.error('Failed to fetch materials', err);
        setMaterialsError(err.message || 'Failed to fetch materials');
      } finally {
        setIsLoadingMaterials(false);
      }
    };

    fetchMaterials();

    // Only fetch user data if authenticated
    if (!token || authLoading) return;

    // Fetch user addresses (if authenticated)
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${apiBase}/addresses`, { 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) return; // probably not authenticated, silently ignore
        const json = await res.json();
        const data = (json.data || json) || [];

        // Normalize addresses to { id: string, street, city, raw }
        const normalized = data.map(a => ({
          id: String(a.address_id || a.id),
          street: a.street || a.address || '',
          city: a.city || '',
          raw: a
        }));

        setAddresses(normalized);
        if (normalized.length > 0) {
          setSelectedAddressId(normalized[0].id);
        }
      } catch (err) {
        console.warn('Could not fetch addresses', err);
      }
    };

    fetchAddresses();
    
    // Fetch user phone numbers (if authenticated)
    const fetchPhoneNumbers = async () => {
      try {
        const res = await fetch(`${apiBase}/phone-numbers`, { 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) return; // probably not authenticated, silently ignore
        const json = await res.json();
        const data = (json.data || json) || [];

        // Normalize phone numbers to { id: string, number, raw }
        const normalized = data.map(p => ({
          id: String(p.id || p.phone_id || p.user_id),
          number: p.number || p.phone_number || p.phone || '',
          raw: p
        }));

        setPhoneNumbers(normalized);
        if (normalized.length > 0) {
          setSelectedPhoneId(normalized[0].id);
          setFormData(prev => ({ ...prev, phoneNumber: normalized[0].number }));
        }
      } catch (err) {
        console.warn('Could not fetch phone numbers', err);
      }
    };
    
    fetchPhoneNumbers();
  }, [token, authLoading]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const createAddress = async () => {
    if (!newAddressStreet.trim()) {
      setValidationErrors({ pickup_address_id: 'Address street is required.' });
      return null;
    }

    if (!token) {
      setValidationErrors({ pickup_address_id: 'You must be logged in to create addresses.' });
      return null;
    }

    setIsCreatingAddress(true);
    try {
      const res = await fetch(`${apiBase}/addresses`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ street: newAddressStreet.trim(), city: newAddressCity.trim() })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setValidationErrors({ pickup_address_id: err.message || 'Failed to create address' });
        return null;
      }

      const json = await res.json();
      const addr = json.data;
      // Normalize address
      const normAddr = { id: String(addr.address_id || addr.id), street: addr.street || '', city: addr.city || '', raw: addr };
      const updated = [...addresses, normAddr];
      setAddresses(updated);
      setSelectedAddressId(normAddr.id);
      setShowAddAddressForm(false);
      setNewAddressStreet('');
      setNewAddressCity('');
      setValidationErrors({});
      return normAddr.id;
    } catch (err) {
      console.error('Create address error', err);
      setValidationErrors({ pickup_address_id: 'Failed to create address' });
      return null;
    } finally {
      setIsCreatingAddress(false);
    }
  };

  const createPhone = async () => {
    if (!newPhoneNumber.trim()) {
      setValidationErrors({ contact_phone: 'Phone number is required.' });
      return null;
    }

    if (!token) {
      setValidationErrors({ contact_phone: 'You must be logged in to create phone numbers.' });
      return null;
    }

    setIsCreatingPhone(true);
    try {
      const res = await fetch(`${apiBase}/phone-numbers`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ number: newPhoneNumber.trim() })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setValidationErrors({ contact_phone: err.message || 'Failed to create phone number' });
        return null;
      }

      const json = await res.json();
      const phone = json.data;
      const normPhone = { id: String(phone.id || phone.phone_id || phone.user_id), number: phone.number || phone.phone_number || phone.phone || '', raw: phone };
      const updated = [...phoneNumbers, normPhone];
      setPhoneNumbers(updated);
      setSelectedPhoneId(normPhone.id);
      setFormData(prev => ({ ...prev, phoneNumber: normPhone.number }));
      setShowAddPhoneForm(false);
      setNewPhoneNumber('');
      setValidationErrors({});
      return normPhone.id;
    } catch (err) {
      console.error('Create phone error', err);
      setValidationErrors({ contact_phone: 'Failed to create phone number' });
      return null;
    } finally {
      setIsCreatingPhone(false);
    }
  };

  const toggleMaterial = (materialId) => {
    if (expandedMaterial === materialId) {
      setExpandedMaterial(null);
    } else {
      setExpandedMaterial(materialId);
    }
  };

  const handleItemQuantityChange = (materialId, itemId, quantity) => {
    // Find the material and item
    const material = materials.find(m => m.id === materialId);
    const item = material.items.find(i => i.id === itemId);
    
    // Check if item already exists in selectedItems
    const existingItemIndex = selectedItems.findIndex(
      si => si.materialId === materialId && si.itemId === itemId
    );
    
    let newSelectedItems = [...selectedItems];
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      if (existingItemIndex !== -1) {
        newSelectedItems.splice(existingItemIndex, 1);
      }
    } else {
      // Update or add item
      const itemData = {
        materialId,
        materialName: material.name,
        itemId,
        name: item.name,
        quantity,
        price: item.price,
        unit: item.unit,
        total: parseFloat((item.price * quantity).toFixed(2))
      };
      
      if (existingItemIndex !== -1) {
        newSelectedItems[existingItemIndex] = itemData;
      } else {
        newSelectedItems.push(itemData);
      }
    }
    
    setSelectedItems(newSelectedItems);
    
    // Calculate total amount
    const newTotal = newSelectedItems.reduce((sum, item) => sum + item.total, 0);
    setTotalAmount(parseFloat(newTotal.toFixed(2)));
  };

  const removeItem = (materialId, itemId) => {
    const newSelectedItems = selectedItems.filter(
      item => !(item.materialId === materialId && item.itemId === itemId)
    );
    setSelectedItems(newSelectedItems);
    
    // Recalculate total amount
    const newTotal = newSelectedItems.reduce((sum, item) => sum + item.total, 0);
    setTotalAmount(parseFloat(newTotal.toFixed(2)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Frontend validation that mirrors backend StoreRequestRequest
    const errors = {};

    // request_type: required, must be either 'Donation' or 'Recycling'
    const requestType = formData.request_type || 'Recycling';
    if (!['Donation', 'Recycling'].includes(requestType)) {
      errors.request_type = 'Request type must be either Donation or Recycling.';
    }

    // pickup_address_id: required, must be an integer that exists in addresses
    if (!selectedAddressId) {
      errors.pickup_address_id = 'Please select or create a pickup address.';
    }

    // pickup date: required, date, >= today, <= 3 months from now, not Friday
    if (!formData.pickupDate) {
      errors.pickup_date = 'Please select a pickup date.';
    } else {
      const selected = new Date(formData.pickupDate);
      const now = new Date();
      const diffHours = (selected - now) / (1000 * 60 * 60);
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      
      // Friday check (Friday is day 5 in JS where Sunday=0)
      if (selected.getDay() === 5) {
        errors.pickup_date = 'Pickup cannot be scheduled on Fridays.';
      }
      
      // Past date check
      if (selected < new Date(now.toDateString())) {
        errors.pickup_date = 'Pickup date cannot be in the past.';
      }
      
      // 48 hours in advance check
      if (diffHours < 48) {
        errors.pickup_date = 'Pickup must be scheduled at least 48 hours in advance.';
      }
      
      // Max 3 months check
      if (selected > maxDate) {
        errors.pickup_date = 'Pickup date cannot be more than 3 months in advance.';
      }
    }

    // materials: required, array, min 1 item
    if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
      errors.materials = 'You must include at least one material in your request.';
    } else {
      const materialIds = [];
      selectedItems.forEach((it, idx) => {
        // material_id: required, integer, must exist in materials table
        if (!it.itemId) {
          errors[`materials.${idx}.material_id`] = 'Each material must have a valid material ID.';
        }
        
        // quantity: required, numeric
        if (typeof it.quantity !== 'number' || Number.isNaN(it.quantity)) {
          errors[`materials.${idx}.quantity`] = 'Quantity must be a valid number.';
        } else {
          // Get user type (default to 'user' if not available)
          const userType = localStorage.getItem('user_type') || 'user';
          
          // Get material and unit
          const mat = materials.find(m => m.id === it.materialId);
          const unit = it.unit || (mat && mat.items && mat.items[0] && mat.items[0].unit) || 'pieces';
          
          // Apply validation rules based on user type
          if (userType === 'user') {
            if (unit === 'pieces' || unit === 'item') {
              if (it.quantity < 1) {
                errors[`materials.${idx}.quantity`] = 'For users, minimum quantity per item is 1.';
              }
              if (!Number.isInteger(it.quantity)) {
                errors[`materials.${idx}.quantity`] = 'For users, quantity for items must be a whole number.';
              }
            }
            if (unit === 'kg' && it.quantity < 1) {
              errors[`materials.${idx}.quantity`] = 'For users, minimum quantity is 1 kg.';
            }
          } else if (userType === 'factory') {
            if (unit === 'pieces' || unit === 'item') {
              if (it.quantity < 1) {
                errors[`materials.${idx}.quantity`] = 'For factories, minimum quantity per item is 1.';
              }
              if (!Number.isInteger(it.quantity)) {
                errors[`materials.${idx}.quantity`] = 'For factories, quantity for items must be a whole number.';
              }
            }
            if (unit === 'kg' && it.quantity < 100) {
              errors[`materials.${idx}.quantity`] = 'For factories, minimum quantity is 100 kg (0.1 ton).';
            }
          }
        }
        
        materialIds.push(it.itemId || it.materialId);
      });
      
      // Check for duplicate materials
      const uniqueIds = Array.from(new Set(materialIds));
      if (uniqueIds.length !== materialIds.length) {
        errors.materials = 'You cannot include the same material multiple times in one request.';
      }
    }

    // contact phone: required, valid format, max 20 chars
    if (!formData.phoneNumber) {
      errors.contact_phone = 'Contact phone must be included.';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
      errors.contact_phone = 'Please enter a valid phone number.';
    } else if (formData.phoneNumber.length > 20) {
      errors.contact_phone = 'Contact phone cannot exceed 20 characters.';
    }

    // notes: optional, max 1000 chars
    if (formData.notes && formData.notes.length > 1000) {
      errors.notes = 'Notes cannot exceed 1000 characters.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Display validation errors at the top of the form
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

  // Build payload to match backend
  // If user didn't have saved addresses and entered a freeform address, create it first
    let pickupAddressId = selectedAddressId;
    setIsSubmitting(true);
    setSubmissionError(null);
    
    if (!pickupAddressId) {
      // create address via API (requires auth)
      if (!token) {
        setValidationErrors({ pickup_address_id: 'You must be logged in to create addresses.' });
        setSubmissionError('You must be logged in to submit a recycling request.');
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      try {
        const addrRes = await fetch(`${apiBase}/addresses`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ street: formData.address, city: '' })
        });
        if (addrRes.ok) {
          const addrJson = await addrRes.json();
          const addrData = addrJson.data || addrJson;
          pickupAddressId = String(addrData.address_id || addrData.id);
        } else {
          const err = await addrRes.json().catch(() => ({}));
          setValidationErrors({ pickup_address_id: err.message || 'Failed to create pickup address' });
          setSubmissionError('Failed to create pickup address. Please try again.');
          setIsSubmitting(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } catch (err) {
        console.error('Failed to create address', err);
        setValidationErrors({ pickup_address_id: 'Failed to create pickup address' });
        setSubmissionError('Network error while creating address. Please check your connection and try again.');
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    const payload = {
      request_type: requestType,
      pickup_address_id: pickupAddressId,
      pickup_date: formData.pickupDate,
      // Ensure backend expects numeric material_id referencing the material record
      materials: selectedItems.map(si => ({ material_id: parseInt(si.materialId, 10) || parseInt(String(si.itemId).replace(/^item-/, ''), 10), quantity: si.quantity })),
      notes: formData.notes || null,
      contact_phone: formData.phoneNumber
    };

    // Submit to backend (requires auth)
    if (!token) {
      setSubmissionError('You must be logged in to submit a recycling request.');
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    try {
      const res = await fetch(`${apiBase}/requests`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 201) {
        // Success
        const json = await res.json();
        setSubmissionSuccess(true);
        setSubmissionError(null);
        
        // Reset form
        setFormData({ fullName: '', phoneNumber: '', address: '', pickupDate: '', preferredTime: '', notes: '' });
        setSelectedItems([]);
        setTotalAmount(0);
        setCurrentPage(1);
        
        // Show success message
        const requestId = json.data?.request_id || 'unknown';
        const successMessage = `Your recycling request #${requestId} has been submitted successfully! You will receive a confirmation email shortly.`;
        alert(successMessage);
      } else if (res.status === 422) {
        // Validation errors from server
        const json = await res.json();
        const serverErrors = json.errors || {};
        setValidationErrors(serverErrors);
        setSubmissionError('Please correct the errors in your form and try again.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (res.status === 401 || res.status === 403) {
        // Authentication/authorization errors
        setSubmissionError('You must be logged in to submit a recycling request. Please log in and try again.');
        window.location.href = '/login?redirect=/recycling-request';
      } else {
        // Other server errors
        const json = await res.json().catch(() => ({}));
        const errorMessage = json.message || `Server error (${res.status}). Please try again later.`;
        setSubmissionError(errorMessage);
        console.error('Server error:', json);
      }
    } catch (err) {
      // Network or other errors
      console.error('Submit error', err);
      setSubmissionError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextPage = () => {
    if (selectedItems.length > 0) {
      setCurrentPage(2);
    } else {
      alert("Please select at least one item to recycle");
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage(1);
  };

  // Render the first page - Material Selection
  const renderMaterialSelectionPage = () => {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Header Banner */}
        <div className="bg-green-600 text-white p-6 rounded-xl mb-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recycling Request
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </h1>
              <p className="text-green-100 mt-2">Select materials and quantities for your recycling pickup request</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between bg-white rounded-lg p-4 mb-6 shadow-sm">
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Make Request
          </button>
          <button className="flex items-center px-4 py-2 bg-white rounded-lg text-gray-700 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Learn More
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Materials</h2>

        {/* Materials Accordion */}
        <div className="space-y-4 mb-6">
          {isLoadingMaterials ? (
            <div className="p-4 bg-white rounded-lg shadow-sm">Loading materials...</div>
          ) : materials && materials.length > 0 ? (
            materials.map((material) => (
            <div key={material.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div 
                className={`flex items-center justify-between p-4 cursor-pointer ${
                  expandedMaterial === material.id ? "border-b border-gray-200" : ""
                }`}
                onClick={() => toggleMaterial(material.id)}
              >
                <div className="flex items-center">
                  <img 
                    src={material.image} 
                    alt={material.name}
                    className="w-12 h-12 object-cover rounded-md mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/48?text=" + material.name.charAt(0);
                    }}
                  />
                  <span className="font-medium">{material.name}</span>
                </div>
                <div className="flex items-center">
                  {selectedItems.filter(item => item.materialId === material.id).length > 0 && (
                    <span className="text-sm text-gray-600 mr-3">
                      {selectedItems.filter(item => item.materialId === material.id).length} item{selectedItems.filter(item => item.materialId === material.id).length !== 1 ? 's' : ''} selected
                    </span>
                  )}
                  {expandedMaterial === material.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedMaterial === material.id && (
                <div className="p-4 bg-gray-50">
                  <div className="space-y-3">
                    {material.items.map((item) => {
                      const selectedItem = selectedItems.find(
                        si => si.materialId === material.id && si.itemId === item.id
                      );
                      const quantity = selectedItem ? selectedItem.quantity : 0;
                      
                      return (
                        <div key={item.id} className={`p-3 rounded-lg border ${quantity > 0 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img 
                                src={material.image} 
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded-md mr-3"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/40?text=" + item.name.charAt(0);
                                }}
                              />
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <button 
                                className="p-1 rounded-md bg-gray-200 text-gray-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleItemQuantityChange(material.id, item.id, Math.max(0, quantity - 1));
                                }}
                              >
                                <Minus size={16} />
                              </button>
                              
                              <span className="mx-3 w-6 text-center">{quantity}</span>
                              
                              <button 
                                className="p-1 rounded-md bg-green-500 text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleItemQuantityChange(material.id, item.id, quantity + 1);
                                }}
                              >
                                <Plus size={16} />
                              </button>
                              
                              <select 
                                className="ml-2 p-1 text-sm border border-gray-300 rounded-md"
                                value={item.unit}
                                disabled
                              >
                                <option value="pieces">pieces</option>
                                <option value="kg">kg</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            ))
          ) : (
            <div className="p-4 bg-white rounded-lg shadow-sm">{materialsError ? `Error loading materials: ${materialsError}` : 'No materials available.'}</div>
          )}
        </div>

        {/* Customer Details Section Preview */}
        {selectedItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="font-bold text-gray-800">Customer Details</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Please proceed to enter your contact and pickup information</p>
            <button 
              onClick={goToNextPage}
              className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              Continue to Customer Details
            </button>
          </div>
        )}

        {/* Request Summary */}
        {selectedItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="font-bold text-gray-800">Request Summary</h3>
              </div>
              <span className="text-sm font-medium text-green-600">{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="space-y-3 mb-3">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <img 
                      src={materials.find(m => m.id === item.materialId)?.image} 
                      alt={item.name}
                      className="w-8 h-8 object-cover rounded-md mr-3"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/32?text=" + item.name.charAt(0);
                      }}
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.materialName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-3">
                      {item.quantity} {item.unit}
                    </span>
                    <span className="text-sm font-medium mr-3">
                      ${item.total.toFixed(2)}
                    </span>
                    <button 
                      className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                      onClick={() => removeItem(item.materialId, item.itemId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {totalAmount > 0 && (
              <div className="flex justify-between items-center pt-2 font-medium">
                <span>Total Amount</span>
                <span className="text-green-600">${totalAmount.toFixed(2)} USD</span>
              </div>
            )}
          </div>
        )}

        {/* Recycling Education Center */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center mb-3">
            <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="font-bold text-gray-800">Recycling Education Center</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Learn proper recycling techniques and make a positive environmental impact</p>
          
          <div className="flex space-x-3 mb-4">
            <button className="flex-1 flex items-center justify-center py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Educational Videos
            </button>
            <button className="flex-1 flex items-center justify-center py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Tips
            </button>
          </div>
          
          {/* Recycling Tips */}
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Plastic Tips
              </h4>
              <ul className="mt-2 space-y-1">
                <li className="text-sm text-gray-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Remove caps and lids before recycling bottles
                </li>
                <li className="text-sm text-gray-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Rinse containers to remove food residue
                </li>
                <li className="text-sm text-gray-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Check the recycling number on the bottom
                </li>
                <li className="text-sm text-gray-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Avoid mixing different plastic types
                </li>
              </ul>
            </div>
            
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-medium text-amber-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Paper Tips
              </h4>
              <ul className="mt-2 space-y-1">
                <li className="text-sm text-gray-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Remove staples and paper clips
                </li>
                <li className="text-sm text-gray-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Keep paper dry and clean
                </li>
                <li className="text-sm text-gray-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Separate different paper grades
                </li>
                <li className="text-sm text-gray-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Avoid wax-coated papers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the second page - Customer Details
  const renderCustomerDetailsPage = () => {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={goToPreviousPage}
              className="flex items-center text-white hover:text-green-100"
            >
              <ArrowLeft className="mr-1" size={18} />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold">Complete Your Request</h1>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Customer Details Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="font-bold text-gray-800">Customer Details</h2>
          </div>
          
          {Object.keys(validationErrors).length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-700">
              <strong>There are some issues with your submission:</strong>
              <ul className="mt-2 list-disc pl-5">
                {Object.entries(validationErrors).map(([k, v]) => (
                  <li key={k}>{Array.isArray(v) ? v.join(', ') : v}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone Number
              </label>
              {phoneNumbers && phoneNumbers.length > 0 ? (
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <select
                      name="phoneNumber"
                      value={selectedPhoneId || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'add_new') {
                          setShowAddPhoneForm(true);
                          setFormData({...formData, phoneNumber: ''});
                        } else {
                          const selectedPhone = phoneNumbers.find(p => p.id === val);
                          setSelectedPhoneId(val);
                          setFormData({
                            ...formData,
                            phoneNumber: selectedPhone ? selectedPhone.number : ''
                          });
                          setShowAddPhoneForm(false);
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                              {phoneNumbers.map((phone) => (
                                <option key={phone.id} value={phone.id}>
                                  {phone.number}
                                </option>
                              ))}
                      <option value="add_new">+ Add new phone number</option>
                    </select>
                  </div>
                </div>
              ) : (
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              )}
              
              {showAddPhoneForm && (
                <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Phone Number</label>
                    <div className="flex space-x-2">
                      <input
                        type="tel"
                        value={newPhoneNumber}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          if (!newPhoneNumber.trim()) {
                            setValidationErrors({ phone_number: 'Phone number is required.' });
                            return;
                          }
                          
                          if (!token) {
                            setValidationErrors({ phone_number: 'You must be logged in to save phone numbers.' });
                            return;
                          }
                          
                          setIsCreatingPhone(true);
                          try {
                            const res = await fetch(`${apiBase}/phone-numbers`, {
                              method: 'POST',
                              headers: { 
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({ number: newPhoneNumber.trim() })
                            });
                            
                            if (!res.ok) {
                              const err = await res.json().catch(() => ({}));
                              setValidationErrors({ phone_number: err.message || 'Failed to save phone number' });
                              return;
                            }
                            
                            const json = await res.json();
                            const phoneData = json.data || json;
                            const norm = { id: String(phoneData.id || phoneData.phone_id || phoneData.user_id), number: phoneData.number || phoneData.phone_number || phoneData.phone || '', raw: phoneData };
                            const updated = [...phoneNumbers, norm];
                            setPhoneNumbers(updated);
                            setSelectedPhoneId(norm.id);
                            setFormData({...formData, phoneNumber: norm.number});
                            setShowAddPhoneForm(false);
                            setNewPhoneNumber('');
                            setValidationErrors({});
                          } catch (err) {
                            console.error('Create phone error', err);
                            setValidationErrors({ phone_number: 'Failed to save phone number' });
                          } finally {
                            setIsCreatingPhone(false);
                          }
                        }}
                        disabled={isCreatingPhone}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        {isCreatingPhone ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pickup Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pickup Address
              </label>
              <div className="flex items-start space-x-3">
                {addresses && addresses.length > 0 ? (
                  <div className="flex-1">
                    <select
                      name="pickup_address"
                      value={selectedAddressId || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'add_new') {
                          setShowAddAddressForm(true);
                        } else {
                          setSelectedAddressId(String(val));
                          setShowAddAddressForm(false);
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      {addresses.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                          {addr.street}{addr.city ? ', ' + addr.city : ''}
                        </option>
                      ))}
                      <option value="add_new">+ Add new address</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex-1">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full address including street, city, state, and postal code"
                      required
                    ></textarea>
                  </div>
                )}

                <div className="w-40">
                  <button
                    type="button"
                    onClick={() => setShowAddAddressForm(v => !v)}
                    className="w-full py-2 px-3 bg-green-100 text-green-800 rounded-lg"
                  >
                    {showAddAddressForm ? 'Cancel' : 'Add'}
                  </button>
                </div>
              </div>

              {showAddAddressForm && (
                <div className="mt-3 bg-gray-50 p-3 rounded border">
                  <label className="block text-sm text-gray-700 mb-1">Street</label>
                  <input
                    type="text"
                    value={newAddressStreet}
                    onChange={(e) => setNewAddressStreet(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                    placeholder="123 Main St"
                  />
                  <label className="block text-sm text-gray-700 mb-1">City (optional)</label>
                  <input
                    type="text"
                    value={newAddressCity}
                    onChange={(e) => setNewAddressCity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    placeholder="City"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={async () => { await createAddress(); }}
                      className="py-2 px-3 bg-green-600 text-white rounded-lg"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddressForm(false)}
                      className="py-2 px-3 bg-white border rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                Pickup Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
                Preferred Time
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select time slot</option>
                <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
              </select>
            </div>
            
            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Any special instructions or notes for the pickup team"
              ></textarea>
            </div>
          </form>
        </div>
        
        {/* Request Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="font-bold text-gray-800">Request Summary</h2>
            </div>
            <span className="text-sm font-medium text-green-600">{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="space-y-3 mb-4">
            {selectedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center">
                  <img 
                    src={materials.find(m => m.id === item.materialId)?.image} 
                    alt={item.name}
                    className="w-8 h-8 object-cover rounded-md mr-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/32?text=" + item.name.charAt(0);
                    }}
                  />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.materialName}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-3">
                    {item.quantity} {item.unit}
                  </span>
                  <span className="text-sm font-medium">
                    ${item.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2 font-medium">
            <span>Total Amount</span>
            <span className="text-green-600">${totalAmount.toFixed(2)} USD</span>
          </div>
          
          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center"
          >
            <Send className="mr-2" size={18} />
            Submit Recycling Request
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white hover:text-green-100 mr-6">
              <ArrowLeft className="mr-2" size={20} />
              <span>Back</span>
            </Link>
            <h1 className="text-2xl font-bold">Recycling Request</h1>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === 1 ? renderMaterialSelectionPage() : renderCustomerDetailsPage()}
    </div>
  );
};

export default RecyclingRequestPage;