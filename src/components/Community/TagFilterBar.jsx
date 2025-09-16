const TagFilterBar = ({ filter, setFilter, popularTags }) => (
  <div className="mb-6">
    <p className="text-sm text-gray-600 mb-2">Filter by tag:</p>
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setFilter('all')}
        className={`px-3 py-1 rounded-full text-sm ${
          filter === 'all'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {popularTags.map(tag => (
        <button
          key={tag}
          onClick={() => setFilter(tag)}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === tag
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  </div>
);

export default TagFilterBar;
