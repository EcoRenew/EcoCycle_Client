import { Tag, Plus } from 'lucide-react';

const TagList = ({
  tags,
  newTag,
  setNewTag,
  addTag,
  removeTag,
  popularTags,
  setNewPost
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Tags (Help others find your project)
    </label>

    {/* Current Tags */}
    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
          >
            <Tag className="w-3 h-3" />
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 text-green-600 hover:text-green-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    )}

    {/* Add New Tag */}
    <div className="flex gap-2">
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTag()}
        placeholder="Add a tag (e.g., upcycling, wood, garden)"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={addTag}
        disabled={!newTag.trim()}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>

    {/* Popular Tags Suggestions */}
    <div className="mt-2">
      <p className="text-xs text-gray-500 mb-2">Popular tags:</p>
      <div className="flex flex-wrap gap-1">
        {popularTags
          .filter(tag => !tags.includes(tag))
          .map(tag => (
            <button
              key={tag}
              onClick={() =>
                setNewPost(prev => ({
                  ...prev,
                  tags: [...prev.tags, tag]
                }))
              }
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </button>
          ))}
      </div>
    </div>
  </div>
);

export default TagList;
