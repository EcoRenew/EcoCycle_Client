// import { useState, useEffect, useCallback } from "react";
// import api from "../services/api.js";
// import { CartContext } from "../context/CartContext.jsx";
// import { useAuth } from "../context/AuthContext.jsx";

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { token } = useAuth(); // ✅ get token from auth

//   // Fetch cart from backend
//   const fetchCart = useCallback(async () => {
//     if (!token) return;
//     try {
//       setLoading(true);
//       const { data } = await api.get("/cart");
//       if (data.success) {
//         setCartItems(data.data.cart_products || []);
//       }
//     } catch (err) {
//       console.error("Fetch cart failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   //  Add product to cart
//   const addToCart = async (product, quantity = 1) => {
//     if (!token) {
//       alert("You must log in to add items to cart");
//       return;
//     }
//     try {
//       const { data } = await api.post("/cart", {
//         product_id: product.id,
//         quantity,
//       });
//       if (data.success) {
//         fetchCart();
//       }
//     } catch (err) {
//       console.error("Add to cart failed:", err);
//     }
//   };

//   // Update cart item quantity
//   const updateCartItem = async (cartProductId, quantity) => {
//     if (!token) return;
//     try {
//       const { data } = await api.put(`/cart/${cartProductId}`, { quantity });
//       if (data.success) {
//         fetchCart();
//       }
//     } catch (err) {
//       console.error("Update cart failed:", err);
//     }
//   };

//   //  Remove from cart
//   const removeFromCart = async (cartProductId) => {
//     if (!token) return;
//     try {
//       const { data } = await api.delete(`/cart/${cartProductId}`);
//       if (data.success) {
//         setCartItems((prev) =>
//           prev.filter((item) => item.id !== cartProductId)
//         );
//       }
//     } catch (err) {
//       console.error("Remove cart item failed:", err);
//     }
//   };

//   //  React when token changes
//   useEffect(() => {
//     if (token) {
//       fetchCart();
//     } else {
//       setCartItems([]);
//     }
//   }, [token, fetchCart]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         loading,
//         fetchCart,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;
