import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  if (!product) return null;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (!user) {
      setMessage("Please login to add items to your cart.");
      return;
    }
    addToCart.mutate({ product, quantity: 1 });
    setMessage("");
  };

  const handleBuyWithPoints = async () => {
    if (!user) {
      setMessage("Please login to buy with points.");
      return;
    }

    if (user.recycling_points < product.points_price) {
      setMessage("Not enough points to buy this product.");
      return;
    }

    try {
      const response = await api.post("/cart/buy-with-points", {
        product_id: product.id,
        quantity: 1,
      });

      if (response.data.success) {
        setMessage("Purchase successful! 🎉");
      } else {
        setMessage(response.data.message || "Not enough points.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error during purchase.");
    }
  };

  return (
    <div className="group relative rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-[#25432E] transition-transform hover:scale-[1.03] duration-300">
      {/* Image container */}
      <div className="relative h-[25rem] w-full overflow-hidden rounded-3xl">
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        />
        <img
          src={product.hover_img || product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent rounded-3xl pointer-events-none"></div>

        <div className="absolute top-1/2 right-4 flex flex-col gap-3 -translate-y-1/2 z-10">
          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`p-3 rounded-full shadow-md transition-transform duration-300 ${
              isOutOfStock
                ? "bg-gray-400 cursor-not-allowed opacity-70"
                : "bg-ecoGreen text-white hover:scale-110 hover:shadow-lg"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
          </button>

          {/* Buy with Points button */}
          <button
            onClick={handleBuyWithPoints}
            disabled={
              isOutOfStock ||
              (user && user.recycling_points < product.points_price)
            }
            className={`p-3 rounded-full shadow-md transition-transform duration-300 bg-yellow-500 text-white hover:scale-110 hover:shadow-lg ${
              user && user.recycling_points < product.points_price
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            aria-label={`Buy ${product.name} with points`}
          >
            <FontAwesomeIcon icon={faStar} className="text-2xl" />
          </button>
        </div>

        {/* Price / Points labels */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1">
          <div className="bg-ecoGreen text-white text-sm font-bold px-3 py-1 rounded-full shadow-md opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            {isOutOfStock ? "Out of Stock" : `${product.price} LE`}
          </div>

          <div className="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            {isOutOfStock ? "Out of Stock" : `${product.points_price} pts`}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {product.name}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-300 text-sm line-clamp-2">
          {product.description || "High-quality eco-friendly product."}
        </p>

        {/* Show messages */}
        {message && (
          <p className="mt-3 text-sm text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
