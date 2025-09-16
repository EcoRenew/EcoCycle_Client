import { Clock, MoreHorizontal } from 'lucide-react';

const PostHeader = ({ post }) => (
  <div className="p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img
        src={post.author.avatar}
        alt={post.author.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium text-gray-900">{post.author.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{post.author.username}</span>
          <span>•</span>
          <Clock className="w-3 h-3" />
          <span>{post.timeAgo}</span>
        </div>
      </div>
    </div>
    <button className="text-gray-400 hover:text-gray-600">
      <MoreHorizontal className="w-5 h-5" />
    </button>
  </div>
);

export default PostHeader;
