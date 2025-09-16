import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBell } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="group relative rounded-md shadow-lg overflow-hidden">
      <div className="relative h-[25rem] w-full overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Floating action buttons - vertical layout */}
        <div className="absolute top-1/2 right-3 flex flex-col gap-3 -translate-y-1/2">
          <button
            onClick={() => addToCart(product)} // ✅ add to cart
            className="p-3 rounded-full bg-ecoGreen text-white shadow-md hover:rotate-12 transition"
            aria-label={`Add ${product.name} to cart`}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
          </button>
          <button className="p-3 rounded-full bg-ecoGreen text-white shadow-md hover:-rotate-12 transition">
            <FontAwesomeIcon icon={faBell} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <span className="inline-block text-sm font-extrabold text-ecoGreen">
          {product.price} LE
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
