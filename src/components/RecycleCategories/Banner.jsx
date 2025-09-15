import React, { useState } from "react";

const Banner = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* Banner */}
      <section className="py-5">
        <div className="bg-green-200 text-white rounded-tl-[12rem] rounded-br-[12rem] rounded-tr-[2px] rounded-bl-[2px] px-6 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0 text-center lg:text-left px-16">
              <h1 className="text-4xl font-bold leading-snug">
                Want to recycle something not from our categories?
              </h1>
              <p className="mt-4 text-[#94a3b8] text-[19px]">
                From paper and glass to metals and electronics responsible recycling creates a sustainable future for all.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 bg-white text-green-700 font-semibold px-6 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                Recycle From here
              </button>
            </div>

            <div className="md:w-1/3">
              <img
                src="/images/Recycling-pana.png"
                alt="Recycling Visual"
                className="w-full max-w-xs object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-green-700">Recycle Form</h2>

            <form className="space-y-6">
              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500">
                  <option value="">Choose...</option>
                  <option value="plastic">Plastic</option>
                  <option value="oil">Oil</option>
                  <option value="cardboard">Cardboard</option>
                  <option value="electronics">Electronics</option>
                  <option value="metals">Metals</option>
                </select>
              </div>

              {/* Object Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What is the object you want to recycle?</label>
                <textarea
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
                  placeholder="Describe the item..."
                ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload a photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                />
                {selectedImage && (
                  <img src={selectedImage} alt="Preview" className="mt-4 rounded-lg w-full max-w-xs" />
                )}
              </div>

              {/* Approximate Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approximate Weight (kg)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
                  placeholder="e.g. 2.5"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
                  placeholder="e.g. 10"
                />
              </div>

              <button
                type="submit"
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;


