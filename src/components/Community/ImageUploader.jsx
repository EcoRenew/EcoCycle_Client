import { Upload, X } from 'lucide-react';

const ImageUploader = ({ images, handleImageUpload, removeImage }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Project Photos * (Max 4 images)
    </label>

    {/* Uploaded Images Preview */}
    {images.length > 0 && (
      <div className="grid grid-cols-2 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Project ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    )}

    {/* Upload Button */}
    {images.length < 4 && (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 mb-2">Upload project photos</p>
        <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors inline-block">
          Choose Photos
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
    )}
  </div>
);

export default ImageUploader;
