import SuggestionCard from './SuggestionCard';

const SuggestionsList = ({ suggestions }) => (
  <div className="mb-12">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">AI Suggestions</h2>
    </div>
    <div className="space-y-6">
      {suggestions.map((s) => <SuggestionCard key={s.id} suggestion={s} />)}
    </div>
  </div>
);

export default SuggestionsList;
