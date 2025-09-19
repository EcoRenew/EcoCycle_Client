import api from "./api.js";

// Fetch user cart
export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

// Add product to cart
export const addProductToCart = async (productId, quantity = 1) => {
  const { data } = await api.post("/cart", {
    product_id: productId,
    quantity,
  });
  return data;
};

// Update cart item quantity
export const updateCartItem = async (cartProductId, quantity) => {
  const { data } = await api.put(`/cart/${cartProductId}`, { quantity });
  return data;
};

// Remove from cart
export const removeCartItem = async (cartProductId) => {
  const { data } = await api.delete(`/cart/${cartProductId}`);
  return data;
};
