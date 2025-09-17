import React, { useState } from 'react';
import HeaderSection from '../components/DIY/HeaderSection';
import SearchUploadSection from '../components/DIY/SearchUploadSection';
import LoadingSpinner from '../components/DIY/LoadingSpinner';
import SuggestionsList from '../components/DIY/SuggestionsList';
import UserInspirationsList from '../components/DIY/UserInspirationsList';


const DIYPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userInspirations = [/* بيانات المجتمع */];

//   const handleSearch = async () => {
//     if (!searchQuery.trim() && !uploadedImage) return;
//     setIsLoading(true);

//     // هنا هتربطي بالباك إند لاحقًا
//     setTimeout(() => {
//       setSuggestions([/* بيانات الاقتراحات */]);
//       setIsLoading(false);
//     }, 2000);
//   };

const handleSearch = async () => {
  if (!searchQuery.trim() && !uploadedImage) return;
  setIsLoading(true);

  try {
    // لو فيه صورة مرفوعة، نبعث وصف بسيط عنها (مؤقتًا)
    const imageDescription = uploadedImage ? "The image shows a recycled item" : null;

    const response = await fetch('http://localhost:8000/api/ai/diy-helper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: searchQuery,
        image_description: imageDescription
      })
    });

    const data = await response.json();

    // نجهز الـ suggestion بالشكل اللي الفرونت بيعرضه
    const suggestion = {
      id: Date.now(), // مؤقتًا
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      image: data.image
    };

    setSuggestions([suggestion]);
  } catch (error) {
    console.error('Error fetching AI suggestion:', error);
  } finally {
    setIsLoading(false);
  }
};


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <HeaderSection />
        <SearchUploadSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleKeyPress={handleKeyPress}
          handleImageUpload={handleImageUpload}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          handleSearch={handleSearch}
        />
        {isLoading && <LoadingSpinner />}
        {!isLoading && suggestions.length > 0 && <SuggestionsList suggestions={suggestions} />}
        <UserInspirationsList inspirations={userInspirations} />
      </div>
    </div>
  );
};

export default DIYPage;
