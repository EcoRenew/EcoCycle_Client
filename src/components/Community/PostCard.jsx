import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostImages from './PostImages';
import PostActions from './PostActions';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

const PostCard = ({
  post,
  toggleLike,
  toggleComments,
  addComment,
  handleCommentChange,
  newComment
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostImages images={post.images} title={post.title} />
      <PostActions
        post={post}
        toggleLike={toggleLike}
        toggleComments={toggleComments}
      />
      {post.showComments && (
        <div className="px-4 pb-4 space-y-3">
          <CommentList comments={post.comments} />
          <CommentInput
            postId={post.id}
            value={newComment[post.id] || ''}
            onChange={handleCommentChange}
            onSend={() => addComment(post.id)}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
