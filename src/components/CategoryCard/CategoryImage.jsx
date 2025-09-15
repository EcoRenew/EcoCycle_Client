const CategoryImage = ({ imageUrl }) => (
  <div className="px-6 pt-6 pb-4">
    <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
      <img src={imageUrl} alt="Category" className="w-full h-full object-cover" />
    </div>
  </div>
);

export default CategoryImage;
