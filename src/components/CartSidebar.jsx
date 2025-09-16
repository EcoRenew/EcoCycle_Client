import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  if (!isOpen) return null; // hide sidebar when not open

  return (
    <aside className="fixed right-0 top-0 w-80 h-full bg-white dark:bg-[#25432E] shadow-lg flex flex-col z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="hover:text-gray-500">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                {/* Product Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />

                {/* Product Info */}
                <div className="flex-1 ml-3">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">{item.price} LE</p>

                  {/* Quantity controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 bg-gray-200 dark:text-black rounded-l hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 bg-gray-100 dark:text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-2 py-1 bg-gray-200 dark:text-black rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t sticky bottom-0 bg-white dark:bg-[#25432E]">
          <button className="w-full py-3 bg-ecoGreen text-white font-semibold rounded-lg hover:bg-green-700 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </aside>
  );
};

export default CartSidebar;
