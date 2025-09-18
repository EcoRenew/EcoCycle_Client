import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../hooks/useCart";
import { createStripeCheckoutSession } from "../services/stripeService";
import { useAuth } from "../context/AuthContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    loading,
    isAuthenticated,
    fetchCart,
    updateCartItem,
  } = useCart();
  const { token, user } = useAuth();
  // Refresh cart when sidebar opens
  useEffect(() => {
    if (isOpen && isAuthenticated) fetchCart();
  }, [isOpen, isAuthenticated, fetchCart]);

  if (!isOpen) return null;

  // get token

  const handleCheckout = async () => {
    // if (!user) {
    //   alert("Please login first!");
    //   return;
    // }

    const products = cartItems
      .filter((item) => (item.product || item)?.id)
      .map((item) => ({
        id: (item.product || item).id,
        quantity: item.quantity,
      }));

    if (!products.length) {
      alert("Cart is empty!");
      return;
    }

    try {
      const session = await createStripeCheckoutSession(products, token); // pass token
      window.location.href = session.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to start checkout. Try again.");
    }
  };
  const handleAdd = (product) => {
    if (!product?.id) return;
    addToCart(product, 1);
  };
  const handleRemove = (item) => {
    if (!item?.id) return;

    if (item.quantity > 1) {
      // Decrease quantity by 1
      updateCartItem(item.id, item.quantity - 1);
    } else {
      // If quantity = 1, remove completely
      removeFromCart(item.id);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const product = item.product || item;
    const price = product?.price || 0;
    const quantity = item.quantity || 0;
    return sum + price * quantity;
  }, 0);

  return (
    <aside className="fixed right-0 top-0 w-80 h-full bg-white dark:bg-[#25432E] shadow-lg flex flex-col z-50">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="hover:text-gray-500">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, idx) => {
              const product = item.product || item;
              return (
                <li
                  key={item.id || product.id || idx}
                  className="flex items-center justify-between border-b pb-3"
                >
                  {product?.img ? (
                    <img
                      src={product.img}
                      alt={product?.name || "Product"}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                      No Image
                    </div>
                  )}

                  <div className="flex-1 ml-3">
                    <p className="font-semibold">
                      {product?.name || "Unknown"}
                    </p>
                    <p className="text-sm">{product?.price || 0} LE</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleRemove(item)}
                        disabled={item.quantity <= 0}
                        className="px-2 py-1 bg-gray-200 dark:text-black rounded-l hover:bg-gray-300"
                      >
                        −
                      </button>

                      <span className="px-3 py-1 bg-gray-100 dark:text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleAdd(product)}
                        disabled={item.quantity >= (product?.stock || 0)}
                        className={`px-2 py-1 bg-gray-200 dark:text-black rounded-r hover:bg-gray-300 ${
                          item.quantity >= (product?.stock || 0)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t sticky bottom-0 bg-white dark:bg-[#25432E]">
          <p className="mb-2 font-semibold">Total: {total} LE</p>
          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-ecoGreen text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </aside>
  );
};

export default CartSidebar;
