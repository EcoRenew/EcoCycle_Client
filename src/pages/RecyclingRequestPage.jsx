import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ChevronDown, ChevronUp, X, Calendar, Clock, Send, Play, BookOpen, Lightbulb } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NavbarComponent from '../components/NavbarComponent';

const envBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const apiBase = envBase.endsWith('/api') ? envBase : `${envBase.replace(/\/$/, '')}/api`;

const RecyclingRequestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuth();
  
  // Navigation state
  const [currentPage, setCurrentPage] = useState(location.pathname === '/customer-details' ? 'customer-details' : 'material-selection');
  const [activeTab, setActiveTab] = useState('make-request');
  
  // Material data
  // replaced static categories with state loaded from backend
  const [materialCategories, setMaterialCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(true);
  const [materialsError, setMaterialsError] = useState(null);
  
  // Selection state
  const [selectedItems, setSelectedItems] = useState(location.state?.selectedItems || []);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [totalValue, setTotalValue] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phoneNumber: '',
    address: '',
    pickupDate: '',
    preferredTime: '',
    requestType: 'recycle_for_money'
  });
  
  // Phone numbers and addresses state
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isAddingPhone, setIsAddingPhone] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newAddress, setNewAddress] = useState({ street: '', city: '' });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [submissionError, setSubmissionError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Educational content
  const educationalVideos = [
    { id: 1, title: 'Plastic Recycling Basics', category: 'plastic', duration: '3:45', thumbnail: '/api/placeholder/300/200' },
    { id: 2, title: 'Paper Sorting Guide', category: 'paper', duration: '2:30', thumbnail: '/api/placeholder/300/200' },
    { id: 3, title: 'Glass Recycling Process', category: 'glass', duration: '4:15', thumbnail: '/api/placeholder/300/200' },
    { id: 4, title: 'Metal Recovery Methods', category: 'metal', duration: '5:20', thumbnail: '/api/placeholder/300/200' },
    { id: 5, title: 'General Recycling Tips', category: 'general', duration: '6:10', thumbnail: '/api/placeholder/300/200' },
    { id: 6, title: 'Preparing Materials for Pickup', category: 'general', duration: '3:55', thumbnail: '/api/placeholder/300/200' }
  ];
  
  const recyclingTips = {
    plastic: [
      'Remove caps and lids before recycling',
      'Rinse containers to remove food residue',
      'Check recycling symbols on plastic items',
      'Avoid mixing different plastic types',
      'Compress bottles to save space',
      'Remove labels when possible'
    ],
    paper: [
      'Remove staples and paper clips',
      'Keep paper dry and clean',
      'Separate cardboard from regular paper',
      'Avoid wax-coated or laminated papers',
      'Flatten boxes to save space',
      'Remove plastic windows from envelopes'
    ],
    glass: [
      'Remove metal caps and corks',
      'Rinse containers thoroughly',
      'Separate by color when possible',
      'Handle broken glass with care',
      'Don\'t include ceramics with glass',
      'Remove labels when possible'
    ],
    metal: [
      'Remove labels when possible',
      'Separate ferrous from non-ferrous metals',
      'Clean containers before recycling',
      'Check for hazardous material residue',
      'Crush aluminum cans to save space',
      'Remove plastic parts when possible'
    ],
    electronics: [
      'Remove batteries before recycling',
      'Wipe personal data from devices',
      'Keep cords with their devices',
      'Look for e-waste specific collection events',
      'Consider donating working electronics',
      'Check manufacturer take-back programs'
    ],
    textiles: [
      'Clean items before recycling or donating',
      'Separate by material type when possible',
      'Repair items before discarding',
      'Consider textile-specific collection points',
      'Repurpose worn textiles as cleaning rags',
      'Check for clothing donation programs'
    ]
  };
  
  // Load categories and materials from backend and transform to UI shape
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingMaterials(true);
        const [catsRes, matsRes] = await Promise.all([
          fetch(`${apiBase}/categories`),
          fetch(`${apiBase}/materials`)
        ]);

        if (!catsRes.ok || !matsRes.ok) {
          setMaterialsError('Failed to load categories or materials');
          return;
        }

        const catsJson = await catsRes.json();
        const matsJson = await matsRes.json();

        const cats = catsJson.data || catsJson;
        const mats = matsJson.data || matsJson;

        setMaterials(mats);

        // transform backend data into the same shape the UI expects
        const transformed = (cats || []).map(cat => {
          const catId = cat.slug || `cat-${cat.category_id}`;
          return {
            id: catId,
            category_id: cat.category_id,
            name: cat.category_name,
            icon: cat.icon || '📦',
            color: cat.color || 'bg-gray-50 border-gray-200',
            image_url: cat.image_url || null,
            items: (mats || [])
              .filter(m => m.category_id === cat.category_id)
              .map(m => ({
                id: `material-${m.material_id}`,
                material_id: m.material_id,
                name: m.material_name,
                description: m.description || '',
                units: m.units || (m.default_unit ? [m.default_unit] : (m.unit ? [m.unit] : ['kg'])),
                defaultUnit: m.default_unit || m.unit || 'kg',
                pricePerUnit: parseFloat(m.price_per_unit) || 0,
                photo: m.image_url || m.photo || ''
              }))
          };
        });

        setMaterialCategories(transformed);
      } catch (error) {
        console.error('Error fetching categories/materials:', error);
        setMaterialsError('Network error loading categories or materials');
      } finally {
        setIsLoadingMaterials(false);
      }
    };

    fetchData();
  }, []);
  
  // Calculate total value
  useEffect(() => {
    const total = selectedItems.reduce((sum, item) => {
      const category = materialCategories.find(cat => cat.id === item.categoryId);
      const materialItem = category?.items.find(i => i.id === item.itemId);
      const basePrice = materialItem?.pricePerUnit || 0;
      const multiplier = formData.requestType === 'donate' ? 0 : 1;
      return sum + (item.quantity * basePrice * multiplier);
    }, 0);
    setTotalValue(total);
  }, [selectedItems, formData.requestType]);
  
  // Handle navigation
  useEffect(() => {
    if (currentPage === 'customer-details' && location.pathname !== '/customer-details') {
      navigate('/customer-details', { state: { selectedItems }, replace: true });
    } else if (currentPage === 'material-selection' && location.pathname !== '/recycling-request') {
      navigate('/recycling-request', { state: { selectedItems }, replace: true });
    }
  }, [currentPage, selectedItems, navigate, location.pathname]);
  
  // Toast notification
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  // Handle item selection
  const handleItemSelection = (categoryId, itemId, quantity, unit) => {
    setSelectedItems(prev => {
      const existingIndex = prev.findIndex(item => item.categoryId === categoryId && item.itemId === itemId);
      
      if (quantity === 0) {
        // Remove item
        if (existingIndex !== -1) {
          const newItems = [...prev];
          newItems.splice(existingIndex, 1);
          showToastMessage('Item removed from selection');
          return newItems;
        }
        return prev;
      }
      
      const category = materialCategories.find(cat => cat.id === categoryId);
      const materialItem = category?.items.find(i => i.id === itemId);
      
      const newItem = {
        categoryId,
        itemId,
        categoryName: category?.name,
        itemName: materialItem?.name,
        quantity,
        unit: unit || materialItem?.defaultUnit,
        pricePerUnit: materialItem?.pricePerUnit || 0
      };
      
      if (existingIndex !== -1) {
        // Update existing item
        const newItems = [...prev];
        newItems[existingIndex] = newItem;
        return newItems;
      } else {
        // Add new item
        showToastMessage('Item added to selection');
        return [...prev, newItem];
      }
    });
  };
  
  // Remove item from selection
  const removeItem = (categoryId, itemId) => {
    setSelectedItems(prev => prev.filter(item => !(item.categoryId === categoryId && item.itemId === itemId)));
    showToastMessage('Item removed from selection');
  };
  
  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!formData.pickupDate) {
      errors.pickupDate = 'Pickup date is required';
    } else {
      const selectedDate = new Date(formData.pickupDate);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 2); // 48 hours minimum
      
      if (selectedDate < minDate) {
        errors.pickupDate = 'Pickup must be scheduled at least 48 hours in advance';
      }
    }
    
    if (!formData.preferredTime) {
      errors.preferredTime = 'Preferred time is required';
    }
    
    if (selectedItems.length === 0) {
      errors.materials = 'Please select at least one material';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Submit form
  const handleSubmit = async () => {
    if (!validateForm()) {
      showToastMessage('Please correct the errors in the form');
      return;
    }
    
    if (!token) {
      showToastMessage('Please log in to submit a request');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      // Create address if needed
      let addressId = null;
      const addressResponse = await fetch(`${apiBase}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          street: formData.address,
          city: ''
        })
      });
      
      if (addressResponse.ok) {
        const addressData = await addressResponse.json();
        addressId = addressData.data?.address_id || addressData.data?.id;
      }
      
      // Prepare materials for submission
      const materials = selectedItems.map(item => ({
        material_id: parseInt(item.itemId.replace(/^\w+-/, ''), 10) || 1, // Extract numeric ID or default
        quantity: item.quantity
      }));
      
      // Submit request
      const requestPayload = {
        request_type: formData.requestType,
        pickup_address_id: addressId,
        pickup_date: formData.pickupDate,
        materials,
        contact_phone: formData.phoneNumber,
        notes: `Customer: ${formData.fullName}, Preferred time: ${formData.preferredTime}`
      };
      
      const response = await fetch(`${apiBase}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestPayload)
      });
      
      if (response.status === 201) {
        const result = await response.json();
        const requestId = result.data?.request_id || 'unknown';
        
        // Reset form and show success
        setSelectedItems([]);
        setFormData({
          fullName: '',
          phoneNumber: '',
          address: '',
          pickupDate: '',
          preferredTime: '',
          requestType: 'recycle_for_money'
        });
        
        showToastMessage(`Request #${requestId} submitted successfully!`);
        setCurrentPage('material-selection');
      } else {
        const errorData = await response.json();
        setSubmissionError(errorData.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Material Selection Page Component
  const MaterialSelectionPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <NavbarComponent />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Material Selection & Educational Hub</h1>
          <p className="text-green-100 text-lg">Choose materials for recycling and learn about sustainable practices</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6 flex">
          <button
            type="button"
            onClick={() => setActiveTab('make-request')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              activeTab === 'make-request'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📋 Make Request
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('learn-more')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              activeTab === 'learn-more'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📚 Learn More
          </button>
        </div>
        
        {activeTab === 'make-request' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Material Selection */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Materials</h2>
              
              <div className="space-y-4">
                {materialCategories.map((category) => {
                  const selectedCount = selectedItems.filter(item => item.categoryId === category.id).length;
                  const isExpanded = expandedCategories[category.id];
                  const totalCategoryValue = selectedItems
                    .filter(item => item.categoryId === category.id)
                    .reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);
                  
                  return (
                    <div 
                      key={category.id} 
                      className={`bg-white rounded-xl shadow-md border-2 ${category.color} overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}`}
                    >
                      <div
                        className={`p-6 cursor-pointer transition-all duration-300 ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`text-3xl p-3 rounded-full ${isExpanded ? 'bg-green-100' : 'bg-gray-100'} transition-colors duration-300`}>
                              {category.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                              <p className="text-gray-600">{category.items.length} items available</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {selectedCount > 0 && (
                              <div className="flex flex-col items-end">
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                                  {selectedCount} selected
                                </span>
                                {totalCategoryValue > 0 && (
                                  <span className="text-green-600 text-sm font-medium mt-1">
                                    ${totalCategoryValue.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                              <ChevronDown size={24} className="text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="px-6 pb-6 space-y-4">
                          {category.items.map((item) => {
                            const selectedItem = selectedItems.find(si => si.categoryId === category.id && si.itemId === item.id);
                            const quantity = selectedItem?.quantity || 0;
                            const currentUnit = selectedItem?.unit || item.defaultUnit;
                            const itemValue = quantity * item.pricePerUnit;
                            
                            return (
                              <div 
                                key={item.id} 
                                className={`p-4 rounded-lg border-2 transition-all duration-300 ${quantity > 0 
                                  ? 'border-green-300 bg-green-50 shadow-md transform scale-[1.02]' 
                                  : 'border-gray-200 bg-white hover:border-gray-300'}`}
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="flex items-center gap-4">
                                    <img
                                      src={item.photo || 'https://portal.bekia-egypt.com/storage/items/xVaMZGC47cbLREMB3HzpPy9nbo6rkCttgUJ1PaMq.png'}
                                      alt={item.name}
                                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-gray-800 text-lg truncate">{item.name}</h4>
                                      <p className="text-gray-600 text-sm truncate">{item.description}</p>
                                      <div className="flex items-center mt-1">
                                        <p className="text-green-600 text-sm font-medium">
                                          ${item.pricePerUnit.toFixed(2)} per {item.defaultUnit}
                                        </p>
                                        {quantity > 0 && (
                                          <span className="ml-3 text-green-700 font-medium">
                                            Total: ${itemValue.toFixed(2)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3">
                                    <button
                                      type="button"
                                      onClick={() => handleItemSelection(category.id, item.id, Math.max(0, quantity - 1), currentUnit)}
                                      className={`p-2 rounded-lg transition-all duration-200 ${quantity > 0 
                                        ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus size={18} />
                                    </button>
                                    
                                    <div className="w-16 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg">
                                      <span className="font-semibold text-lg">{quantity}</span>
                                    </div>
                                    
                                    <button
                                      type="button"
                                      onClick={() => handleItemSelection(category.id, item.id, quantity + 1, currentUnit)}
                                      className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200 transform hover:scale-105"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus size={18} />
                                    </button>
                                    
                                    <select
                                      value={currentUnit}
                                      onChange={(e) => handleItemSelection(category.id, item.id, quantity, e.target.value)}
                                      className="ml-2 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                      aria-label="Select unit"
                                    >
                                      {item.units.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Request Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Request Summary</h3>
                  
                  {selectedItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No items selected yet</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6">
                        {selectedItems.map((item, index) => {
                          const categoryData = materialCategories.find(cat => cat.id === item.categoryId);
                          const itemData = categoryData?.items.find(i => i.id === item.itemId);
                          const photo = itemData?.photo || 'https://portal.bekia-egypt.com/storage/items/xVaMZGC47cbLREMB3HzpPy9nbo6rkCttgUJ1PaMq.png';
                          return (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <img src={photo} alt={item.itemName} className="w-12 h-12 object-cover rounded-md border border-gray-200 flex-shrink-0" />
                                <div className="truncate">
                                  <h4 className="font-medium text-gray-800 truncate">{item.itemName}</h4>
                                  <p className="text-sm text-gray-600 truncate">{item.categoryName}</p>
                                  <p className="text-sm text-green-600">
                                    {item.quantity} {item.unit} × ${item.pricePerUnit.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.categoryId, item.itemId)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-gray-800">Estimated Value:</span>
                          <span className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => setCurrentPage('customer-details')}
                          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                          Proceed to Customer Details
                          <ArrowLeft className="ml-2 rotate-180" size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Educational Section */
          <div className="space-y-8">
            {/* Video Library */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Play className="mr-2 text-green-600" size={24} />
                Educational Video Library
              </h2>
              <div className="mb-4">
                <p className="text-gray-600 mb-4">Explore our collection of educational videos to learn more about recycling practices and sustainability.</p>
                <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-100">
                  <button type="button" className="px-4 py-2 rounded-full bg-green-600 text-white whitespace-nowrap">All Videos</button>
                  <button type="button" className="px-4 py-2 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 whitespace-nowrap">Plastic</button>
                  <button type="button" className="px-4 py-2 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 whitespace-nowrap">Paper</button>
                  <button type="button" className="px-4 py-2 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 whitespace-nowrap">Glass</button>
                  <button type="button" className="px-4 py-2 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 whitespace-nowrap">Metal</button>
                  <button type="button" className="px-4 py-2 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 whitespace-nowrap">General</button>
                  <button type="button" className="px-4 py-2 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 whitespace-nowrap">Lifestyle</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationalVideos.map((video) => (
                  <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button type="button" className="p-3 bg-white rounded-full text-green-600 hover:bg-green-50 transform transition-transform hover:scale-110">
                          <Play size={24} />
                        </button>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {video.category}
                        </span>
                        <button type="button" className="text-green-600 hover:text-green-800 text-sm font-medium">Watch Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button type="button" className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium transition-colors">
                  Load More Videos
                </button>
              </div>
            </div>
            
            {/* Quick Tips */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Lightbulb className="mr-2 text-green-600" size={24} />
                Recycling Quick Tips
              </h2>
              <p className="text-gray-600 mb-6">Practical advice to help you recycle more effectively and responsibly.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(recyclingTips).map(([category, tips]) => {
                  const categoryData = materialCategories.find(cat => cat.id === category) || {
                    name: category.charAt(0).toUpperCase() + category.slice(1),
                    icon: '💡',
                    color: 'bg-gray-50 border-gray-200'
                  };
                  return (
                    <div key={category} className={`rounded-xl shadow-sm p-6 border-l-4 ${categoryData.color} hover:shadow-md transition-shadow`}>
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">{categoryData.icon}</span>
                        <h3 className="text-xl font-semibold text-gray-800">{categoryData.name}</h3>
                      </div>
                      <ul className="space-y-3">
                        {tips.map((tip, index) => (
                          <li key={index} className="flex items-start group">
                            <Lightbulb className="text-green-600 mr-2 mt-0.5 flex-shrink-0 group-hover:text-green-700 transition-colors" size={16} />
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{tip}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <button type="button" className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                          Learn more about {categoryData.name.toLowerCase()} recycling
                          <ChevronUp size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Recycling Impact Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BookOpen className="mr-2 text-green-600" size={24} />
                Your Recycling Impact
              </h2>
              <p className="text-gray-600 mb-6">Learn how your recycling efforts contribute to environmental sustainability.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">120 kg</div>
                  <p className="text-gray-700">CO₂ emissions saved</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">350 L</div>
                  <p className="text-gray-700">Water conserved</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-amber-600 mb-2">15</div>
                  <p className="text-gray-700">Trees preserved</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button type="button" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center">
                  Calculate Your Impact
                  <ArrowLeft size={18} className="ml-2 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  // Customer Details Page Component
  const CustomerDetailsPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-12">
        <NavbarComponent />
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setCurrentPage('material-selection')}
                  className="flex items-center text-white hover:text-green-100 mr-6 transition-colors"
                  aria-label="Back to material selection"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  Back
                </button>
                <div>
                  <h1 className="text-3xl font-bold">Customer Details</h1>
                  <p className="text-green-100">Complete your recycling request</p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold">1</div>
                    <div className="ml-2">
                      <p className="text-white font-medium">Select Materials</p>
                      <p className="text-green-100 text-sm">Completed</p>
                    </div>
                  </div>
                  <div className="w-12 h-1 bg-white"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold">2</div>
                    <div className="ml-2">
                      <p className="text-white font-medium">Customer Details</p>
                      <p className="text-green-100 text-sm">Current step</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Play className="mr-3 text-green-600" size={24} />
                  Personal Information
                </h2>
                
                {submissionError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <div className="text-red-600 mr-2 flex-shrink-0">!</div>
                    <p className="text-red-700">{submissionError}</p>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="Enter your first name"
                      />
                      {validationErrors.firstName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          {validationErrors.firstName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="Enter your last name"
                      />
                      {validationErrors.lastName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          {validationErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className="mr-2 text-gray-500">@</span>
                        Email Address*
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="Enter your email address"
                      />
                      {validationErrors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className="mr-2 text-gray-500">📞</span>
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="Enter your phone number"
                      />
                      {validationErrors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          {validationErrors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2 text-green-600">📍</span>
                      Pickup Location
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address*</label>
                        <input
                          type="text"
                          name="streetAddress"
                          value={formData.streetAddress || ''}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.streetAddress ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}`}
                          placeholder="Enter your street address"
                        />
                        {validationErrors.streetAddress && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            {validationErrors.streetAddress}
                          </p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city || ''}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}`}
                            placeholder="Enter your city"
                          />
                          {validationErrors.city && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              {validationErrors.city}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state || ''}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.state ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}`}
                            placeholder="Enter your state"
                          />
                          {validationErrors.state && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              {validationErrors.state}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code*</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode || ''}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.zipCode ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}`}
                            placeholder="Enter your ZIP code"
                          />
                          {validationErrors.zipCode && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              {validationErrors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Calendar className="mr-2 text-blue-600" size={20} />
                      Pickup Schedule
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Calendar className="mr-2 text-gray-500" size={16} />
                          Pickup Date*
                        </label>
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate || ''}
                          onChange={handleInputChange}
                          min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                          max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.pickupDate ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}`}
                        />
                        {validationErrors.pickupDate && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            {validationErrors.pickupDate}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">Pickup must be scheduled at least 48 hours in advance and within 3 months.</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Clock className="mr-2 text-gray-500" size={16} />
                          Preferred Time
                        </label>
                        <div className="relative">
                          <select
                            name="preferredTime"
                            value={formData.preferredTime || ''}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none ${validationErrors.preferredTime ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}`}
                          >
                            <option value="">Select a time slot (optional)</option>
                            <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                            <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                            <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ChevronDown size={18} className="text-gray-500" />
                          </div>
                        </div>
                        {validationErrors.preferredTime && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            {validationErrors.preferredTime}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <span className="mr-2 text-gray-500">💬</span>
                      Additional Notes
                    </label>
                    <div className="relative">
                      <textarea
                        name="notes"
                        value={formData.notes || ''}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${validationErrors.notes ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="Any special instructions or additional information"
                      ></textarea>
                      <div className="absolute bottom-3 right-3 text-sm text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
                        {(formData.notes || '').length}/500
                      </div>
                    </div>
                    {validationErrors.notes && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        {validationErrors.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <span className="mr-2 text-gray-500">$</span>
                      Preference
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value="recycle_for_money"
                          checked={formData.requestType === 'recycle_for_money'}
                          onChange={handleInputChange}
                          className="mr-3 text-green-600 focus:ring-green-500 h-5 w-5"
                        />
                        <div>
                          <span className="text-gray-800 font-medium">Recycle for Money</span>
                          <p className="text-gray-500 text-sm">Receive payment based on the value of your recyclables</p>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value="donate"
                          checked={formData.requestType === 'donate'}
                          onChange={handleInputChange}
                          className="mr-3 text-green-600 focus:ring-green-500 h-5 w-5"
                        />
                        <div>
                          <span className="text-gray-800 font-medium">Donate</span>
                          <p className="text-gray-500 text-sm">Donate the value of your recyclables to environmental causes</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentPage('material-selection')}
                      className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ArrowLeft size={18} />
                      Back to Materials
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || selectedItems.length === 0}
                      className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all ${isSubmitting || selectedItems.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:scale-[1.02]'}`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Submit Request
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summary */}
             <div className="lg:col-span-1">
               <div className="sticky top-24">
                 <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                   <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                     <span className="mr-2 text-green-600">🛍️</span>
                     Request Summary
                   </h3>
                   
                   <div className="space-y-3 mb-6">
                     <div className="flex justify-between items-center">
                       <p className="text-gray-700 font-medium">Selected Items:</p>
                       <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                         {selectedItems.length} items
                       </span>
                     </div>
                     
                     {selectedItems.length === 0 ? (
                       <div className="p-4 bg-gray-50 rounded-lg text-center">
                         <div className="mx-auto text-gray-400 mb-2">🧾</div>
                         <p className="text-gray-500 italic">No items selected</p>
                         <button 
                           type="button"
                           onClick={() => setCurrentPage('material-selection')} 
                           className="mt-2 text-green-600 text-sm hover:underline"
                         >
                           Add some items
                         </button>
                       </div>
                     ) : (
                       <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
                         {selectedItems.map((item, index) => {
                           const categoryData = materialCategories.find(cat => cat.id === item.categoryId);
                           const itemData = categoryData?.items.find(i => i.id === item.itemId);
                           
                           if (!itemData) return null;
                           
                           const photo = itemData.photo || 'https://portal.bekia-egypt.com/storage/items/xVaMZGC47cbLREMB3HzpPy9nbo6rkCttgUJ1PaMq.png';
                           const itemTotal = item.quantity * itemData.pricePerUnit * (formData.requestType === 'donate' ? 0 : 1);
                           
                           return (
                             <div key={index} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                               <div className="flex items-start gap-3">
                                 <img src={photo} alt={itemData.name} className="w-10 h-10 object-cover rounded-md border border-gray-200" />
                                 <div>
                                   <p className="font-medium text-gray-800">{itemData.name}</p>
                                   <p className="text-sm text-gray-600">{item.quantity} {item.unit}</p>
                                 </div>
                               </div>
                               <p className="font-medium text-green-600">
                                 {formData.requestType === 'donate' ? (
                                   <span className="text-blue-600">Donated</span>
                                 ) : (
                                   `$${itemTotal.toFixed(2)}`
                                 )}
                               </p>
                             </div>
                           );
                         })}
                       </div>
                     )}
                   </div>
                   
                   <div className="border-t pt-4 mb-6">
                     <div className="flex justify-between items-center">
                       <span className="text-lg font-semibold text-gray-800">Total Value:</span>
                       <span className="text-2xl font-bold text-green-600">
                         {formData.requestType === 'donate' ? (
                           <span className="text-blue-600">Donation</span>
                         ) : (
                           `$${totalValue.toFixed(2)}`
                         )}
                       </span>
                     </div>
                   </div>
                   
                   <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                     <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                       <span className="mr-2 text-blue-600">ℹ️</span>
                       What happens next?
                     </h4>
                     <ul className="text-sm text-gray-600 space-y-2">
                       <li className="flex items-start gap-2">
                         <span className="text-green-600 mt-0.5">✓</span>
                         We'll review your request within 24 hours
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="text-green-600 mt-0.5">✓</span>
                         You'll receive a confirmation email with pickup details
                       </li>
                       <li className="flex items-start gap-2">
                         <span className="text-green-600 mt-0.5">✓</span>
                         Our team will arrive at your location on the scheduled date
                       </li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <>
      {currentPage === 'material-selection' ? <MaterialSelectionPage /> : <CustomerDetailsPage />}
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default RecyclingRequestPage;