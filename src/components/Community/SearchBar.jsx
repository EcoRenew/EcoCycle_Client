import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className=" border-b border-gray-100">
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, tags, or creators..."
          className="w-full pl-10 pr-4  dark:text-black py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  </div>
);

export default SearchBar;
