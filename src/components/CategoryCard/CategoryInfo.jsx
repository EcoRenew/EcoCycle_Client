const CategoryInfo = ({ name, price, points }) => (
  <div className="px-6 pb-2">
    <h3 className="text-gray-800 dark:text-white/80 font-medium text-lg mb-1">
      {name}
    </h3>
    <p className="text-sm text-gray-500 mb-3">{price}</p>
    <div className="text-xl font-bold text-[#38af44] mb-4">{points}</div>
  </div>
);

export default CategoryInfo;
