const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) return null;

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <img
            src={comment.avatar}
            alt={comment.author}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                <span className="text-xs text-gray-500">{comment.timeAgo}</span>
              </div>
              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
              <button className="hover:text-red-500">Like ({comment.likes})</button>
              <button className="hover:text-gray-700">Reply</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
