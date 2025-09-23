import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartButton = ({ cartItems, onClick }) => {
  const items = Array.isArray(cartItems) ? cartItems : [];
  const totalItems = items.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <button onClick={onClick} className="relative">
      <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-ecoGreen text-white text-xs rounded-full px-2 py-1">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
