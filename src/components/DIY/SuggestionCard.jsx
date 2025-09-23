import { Clock, Play } from 'lucide-react';

const SuggestionCard = ({ suggestion }) => (
  <div className="rounded-lg shadow-sm overflow-hidden">
    <div className="flex flex-col md:flex-row">
      {/* <div className="md:w-1/3">
        <img src={suggestion.image} alt={suggestion.title} className="w-full h-48 md:h-full object-cover" />
      </div> */}
      <div className="md:w-2/3 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
        <p className="text-gray-600 mb-4">{suggestion.description}</p>
        {/* <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{suggestion.timeRequired}</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{suggestion.difficulty}</span>
        </div> */}
        <div className="flex gap-3">
          <a href={suggestion.videoUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">Watch Tutorial</a>
          {/* <a href={suggestion.videoUrl} target="_blank" rel="noopener noreferrer" className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
            <Play className="w-4 h-4 inline mr-1" />
            Video Guide
          </a> */}
        </div>
      </div>
    </div>
  </div>
);

export default SuggestionCard;
