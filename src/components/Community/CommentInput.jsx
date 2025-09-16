import { Send } from 'lucide-react';

const CommentInput = ({ postId, value, onChange, onSend }) => (
  <div className="flex gap-3 mt-4">
    <img
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
      alt="You"
      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
    />
    <div className="flex-1 flex gap-2">
      <input
        type="text"
        placeholder="Add a comment..."
        value={value}
        onChange={(e) => onChange(postId, e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
        className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="px-3 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-green-700 transition-colors"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default CommentInput;
