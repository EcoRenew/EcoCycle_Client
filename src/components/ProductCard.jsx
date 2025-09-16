import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBell } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div
      className="group relative rounded-3xl shadow-lg transition-shadow duration-300 overflow-hidden
                 border border-gray-100 
                 dark:bg-[#1B3124]"
    >
      <div className="relative h-[25rem] w-full overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => (e.target.src = "/fallback.jpg")}
        />
        <img
          src={product.hover_img || product.img}
          alt={`${product.name} hover`}
          className="h-full w-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Floating action buttons */}
        <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-3 rounded-full bg-ecoGreen text-white shadow-md hover:rotate-12 transition"
            aria-label={`Add ${product.name} to cart`}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
          </button>
          <button
            className="p-3 rounded-full bg-ecoGreen text-white shadow-md hover:-rotate-12 transition"
            aria-label={`Notify me about ${product.name}`}
          >
            <FontAwesomeIcon icon={faBell} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-bold line-clamp-2 group-hover:text-ecoGreen transition-colors">
          {product.name}
        </h3>

        <span
          className="inline-block text-sm font-extrabold text-ecoGreen bg-green-100 px-3 py-1 rounded-full shadow-sm
                     dark:text-green-300 dark:bg-green-900/40"
        >
          {product.price} LE
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
