import { Tag } from 'lucide-react';

const PostContent = ({ post }) => (
  <div className="px-4 pb-4">
    <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
    <p className="text-gray-700 mb-4">{post.description}</p>

    {/* Tags */}
    <div className="flex flex-wrap gap-1 mb-4">
      {post.tags.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs"
        >
          <Tag className="w-3 h-3" />
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default PostContent;
