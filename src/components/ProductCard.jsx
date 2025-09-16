import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBell } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  if (!product) return null;

  return (
    <div className="group relative rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-[#25432E] transition-transform hover:scale-[1.03] duration-300">
      {/* Image container */}
      <div className="relative h-[25rem] w-full overflow-hidden rounded-3xl">
        {/* Default image */}
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        />
        {/* Hover image */}
        <img
          src={product.hover_img || product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

        {/* Floating action buttons */}
        <div className="absolute top-1/2 right-4 flex flex-col gap-3 -translate-y-1/2 z-10">
          <button
            onClick={() => addToCart(product)}
            className="p-3 rounded-full bg-ecoGreen text-white shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300"
            aria-label={`Add ${product.name} to cart`}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
          </button>
          <button className="p-3 rounded-full bg-ecoGreen text-white shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300">
            <FontAwesomeIcon icon={faBell} className="text-2xl" />
          </button>
        </div>

        {/* Price badge */}
        <div className="absolute bottom-4 left-4 bg-ecoGreen text-white text-sm font-bold px-3 py-1 rounded-full shadow-md opacity-90 transition-opacity duration-300 group-hover:opacity-100">
          {product.price} LE
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {product.name}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-300 text-sm line-clamp-2">
          {product.description || "High-quality eco-friendly product."}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
