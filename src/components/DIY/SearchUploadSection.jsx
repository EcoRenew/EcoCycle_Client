import { Search, Upload, Camera } from "lucide-react";

const SearchUploadSection = ({
    searchQuery,
    setSearchQuery,
    handleKeyPress, 
    handleImageUpload, 
    uploadedImage, 
    setUploadedImage, 
    handleSearch }) => (

  <div className="rounded-lg shadow-sm p-6 mb-8">
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for ideas like 'glass bottles' or 'home decor'"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full pl-10 pr-4 py-3 border dark:text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>

    <div className="text-center">
      <div className="border-2 border-dashed dark:bg-[#25432E] border-gray-300 rounded-lg p-8 mb-4">
        {uploadedImage ? (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded item"
              className="max-w-xs max-h-48 mx-auto rounded-lg"
            />
            <button
              onClick={() => setUploadedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <Camera className="w-12 h-12  text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">
              Or upload an image of your item
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Drag and drop or click to browse and upload an image of the item
              you want to repurpose.
            </p>
          </>
        )}
      </div>

      <div className="flex gap-4 justify-center">
        <label className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors">
          <Upload className="w-4 h-4 inline mr-2" />
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <button
          onClick={handleSearch}
          disabled={!searchQuery.trim() && !uploadedImage}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white dark:text-black px-6 py-2 rounded-lg transition-colors"
        >
          Get Ideas
        </button>
      </div>
    </div>
  </div>
);

export default SearchUploadSection;
