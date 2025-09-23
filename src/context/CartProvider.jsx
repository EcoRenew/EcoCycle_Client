import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartContext } from "./CartContext";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export const CartProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch cart items for logged-in user
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await api.get("/cart");
      return data?.data?.cart_products || data?.data?.cartProducts || [];
    },
    enabled: !!user,
    refetchOnWindowFocus: false, // prevents extra calls on tab switch
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Add to cart
  const addToCart = useMutation({
    mutationFn: async ({ product, quantity }) => {
      const { data } = await api.post("/cart", {
        product_id: product.id,
        quantity,
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", user?.id]),
  });

  // Update cart item
  const updateCartItem = useMutation({
    mutationFn: async ({ cartProductId, quantity }) => {
      const { data } = await api.put(`/cart/${cartProductId}`, { quantity });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", user?.id]),
  });

  // Remove from cart
  const removeFromCart = useMutation({
    mutationFn: async (cartProductId) => {
      const { data } = await api.delete(`/cart/${cartProductId}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["cart", user?.id]),
  });

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        updateCartItem,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
