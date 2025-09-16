import { Heart, MessageCircle } from 'lucide-react';

const PostActions = ({ post, toggleLike, toggleComments }) => (
  <div className="p-4 border-t border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-6">
        <button
          onClick={() => toggleLike(post.id)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
        >
          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          <span className="text-sm">{post.likes}</span>
        </button>
        <button
          onClick={() => toggleComments(post.id)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{post.comments.length}</span>
        </button>
      </div>
    </div>
  </div>
);

export default PostActions;
