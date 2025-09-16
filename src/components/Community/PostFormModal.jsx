import { X } from 'lucide-react';
import ImageUploader from './ImageUploader';
import TagList from './TagList';

const PostFormModal = ({
  newPost,
  setNewPost,
  newTag,
  setNewTag,
  addTag,
  removeTag,
  popularTags,
  handleImageUpload,
  removeImage,
  handleSharePost,
  setShowShareModal
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">

      {/* Modal Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Share Your DIY Project</h2>
        <button
          onClick={() => setShowShareModal(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6 space-y-6">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            placeholder="What did you create?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={newPost.description}
            onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Tell us about your project..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        {/* Image Upload */}
        <ImageUploader
          images={newPost.images}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
        />

        {/* Tags */}
        <TagList
          tags={newPost.tags}
          newTag={newTag}
          setNewTag={setNewTag}
          addTag={addTag}
          removeTag={removeTag}
          popularTags={popularTags}
          setNewPost={setNewPost}
        />
      </div>

      {/* Modal Footer */}
      <div className="flex items-center justify-between p-6 border-t border-gray-200">
        <button
          onClick={() => setShowShareModal(false)}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSharePost}
          disabled={!newPost.title.trim() || !newPost.description.trim() || newPost.images.length === 0}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Share Project
        </button>
      </div>
    </div>
  </div>
);

export default PostFormModal;
