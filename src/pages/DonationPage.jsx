import React, { useState, useEffect } from 'react';
import DonationHeader from '../components/Donation/DonationHeader';
import DonationForm from '../components/Donation/DonationForm';
import DonationNextSteps from '../components/Donation/DonationNextSteps';
import CharityPartners from '../components/Donation/CharityPartners';

const DonationPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Donation form submitted:', formData);
    alert('Thank you for your donation! We will contact you soon.');
  };

  const handleFileUpload = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log('Selected files:', files);
      alert(`${files.length} photo(s) selected successfully!`);
    }
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
          fadeIn={fadeIn}
        />

        <DonationNextSteps />

        <CharityPartners partners={partners} fadeIn={fadeIn} />
      </div>
    </div>
  );
};

export default DonationPage;
