import React, { useState, useEffect } from 'react';
import DonationHeader from '../components/Donation/DonationHeader';
import DonationForm from '../components/Donation/DonationForm';
import DonationNextSteps from '../components/Donation/DonationNextSteps';
import CharityPartners from '../components/Donation/CharityPartners';
import { useAuth } from '../context/AuthContext';

const DonationPage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    pickup_address_id: '',
    itemCategory: '',
    condition: '',
    description: '',
    pickupDate: '',
    additionalNotes: ''
  });

  const partners = [
    { id: 1, name: "Children's Hope Foundation", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80" },
    { id: 2, name: "Community Care Center", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80" },
    { id: 3, name: "Green Earth Initiative", image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=80" },
    { id: 4, name: "Family Support Network", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=80" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/addresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data.addresses || []);
      })
      .catch((err) => {
        console.error("Failed to fetch addresses:", err);
      });
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pickup_address_id) newErrors.pickup_address_id = "Please select an address";
    if (!formData.itemCategory) newErrors.itemCategory = "Please select a category";
    if (!formData.condition) newErrors.condition = "Please select item condition";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
    } else {
      const selectedDate = new Date(formData.pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.pickupDate = "Pickup date cannot be in the past";
      } else if (selectedDate.getDay() === 5) {
        newErrors.pickupDate = "Pickup is not available on Fridays";
      }
    }

    if (uploadedFiles.length === 0) {
      newErrors.photos = "Please upload at least one photo";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please fix the errors before submitting.");
      return;
    }

    if (!user) {
      alert("Please log in before submitting a donation.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("user_id", user.user_id);
    formDataToSend.append("pickup_address_id", formData.pickup_address_id);
    formDataToSend.append("item_category", formData.itemCategory);
    formDataToSend.append("condition", formData.condition);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("pickup_date", formData.pickupDate);
    formDataToSend.append("additional_notes", formData.additionalNotes);

    uploadedFiles.forEach((file, index) => {
      formDataToSend.append(`photos[${index}]`, file);
    });

    try {
      const response = await fetch("http://localhost:8000/api/donations", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      alert(result.message || "Thank you for your donation!");
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleFileUpload = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(file =>
      file.type.startsWith("image/") &&
      ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)
    );

    if (validImages.length === 0) {
      alert("Please select valid image files (JPEG, PNG, etc.)");
      return;
    }

    if (validImages.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }

    setUploadedFiles(validImages);
    setPreviewUrls(validImages.map(file => URL.createObjectURL(file)));
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== indexToRemove);
    const updatedPreviews = previewUrls.filter((_, i) => i !== indexToRemove);

    setUploadedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DonationHeader fadeIn={fadeIn} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <DonationForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileUpload={handleFileUpload}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          previewUrls={previewUrls}
          handleRemoveImage={handleRemoveImage}
          errors={errors}
          fadeIn={fadeIn}
          addresses={addresses}
        />

        <DonationNextSteps />
        <CharityPartners partners={partners} fadeIn={fadeIn} />
      </div>
    </div>
  );
};

export default DonationPage;
