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
  const [fallbackMessage, setFallbackMessage] = useState("");
  const [recommendedInspirations, setRecommendedInspirations] = useState([]);



const handleSearch = async () => {
  if (!searchQuery.trim() && !uploadedImage) return;
  setIsLoading(true);

  try {
    // 1. إرسال الـ prompt للـ AI
    const aiResponse = await fetch("http://localhost:8000/api/ai/diy-helper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: searchQuery,
        image_description: uploadedImage ? "The image shows a recycled item" : null
      })
    });

    const aiData = await aiResponse.json();

    // 2. تجهيز اقتراح المشروع من الـ AI
    const suggestion = {
      id: Date.now(),
      title: aiData.title,
      description: aiData.description,
      videoUrl: aiData.videoUrl,
      image: aiData.image
    };

    setSuggestions([suggestion]);

    // 3. جلب بوستات الـ Community
    const communityResponse = await fetch("http://localhost:8000/api/community/posts");
    const communityData = await communityResponse.json();

    const query = searchQuery.toLowerCase();

    // 4. فلترة البوستات حسب title, description, tags
    // const recommendedPosts = communityData.posts.filter(post =>
    //   post.title.toLowerCase().includes(query) ||
    //   post.description.toLowerCase().includes(query) ||
    //   post.tags.some(tag => tag.toLowerCase().includes(query))
    // );

    const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/gi, '');

    const normalizedQuery = normalize(searchQuery);

    const recommendedPosts = communityData.posts.filter(post =>
    normalize(post.title).includes(normalizedQuery) ||
    normalize(post.description).includes(normalizedQuery) ||
    post.tags.some(tag => normalize(tag).includes(normalizedQuery))
    );

    setRecommendedInspirations(recommendedPosts);

    console.log("Search query:", query);
    console.log("Community posts:", communityData.posts);


    // 5. fallback message لو مفيش بوستات
    if (recommendedPosts.length === 0) {
      setFallbackMessage("No matching community posts found, but here's an AI suggestion you can try!");
    } else {
      setFallbackMessage("");
    }
  } catch (error) {
    console.error("Error during AI search:", error);
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

      {!isLoading && suggestions.length > 0 && (
        <SuggestionsList suggestions={suggestions} />
      )}

      {/* ✅ هنا تظهر رسالة fallback لو مفيش بوستات */}
      {!isLoading && fallbackMessage && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6 text-sm">
          {fallbackMessage}
        </div>
      )}

      {/* {!isLoading && userInspirations.length > 0 && (
        <UserInspirationsList inspirations={userInspirations} />
      )} */}

      {/* ✅ هنا تظهر بوستات المجتمع لو فيه نتائج */}
        {!isLoading && recommendedInspirations.length > 0 && (
            <UserInspirationsList inspirations={recommendedInspirations} />
        )}


    </div>
  </div>
);

};

export default DIYPage;
