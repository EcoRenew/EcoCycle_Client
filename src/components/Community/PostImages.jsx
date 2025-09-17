const PostImages = ({ images, title }) => {
  if (!images || images.length === 0) return null;

  const gridClass = images.length > 1 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <div className={`grid ${gridClass} gap-1`}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${title} ${index + 1}`}
          className="w-full h-64 object-cover"
        />
      ))}
    </div>
  );
};

export default PostImages;
