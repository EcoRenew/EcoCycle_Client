const SearchInfoBox = ({ searchQuery, resultCount, setSearchQuery }) => (
  <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800 flex justify-between items-center">
    <span>
      Showing <strong>{resultCount}</strong> result{resultCount !== 1 && 's'} for "<strong>{searchQuery}</strong>"
    </span>
    <button
      onClick={() => setSearchQuery('')}
      className="text-yellow-700 hover:underline text-xs"
    >
      Clear Search
    </button>
  </div>
);

export default SearchInfoBox;
