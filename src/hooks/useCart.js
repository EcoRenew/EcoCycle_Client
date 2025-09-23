import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export function useCart() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: cartItems,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cart", user?.id], // ✅ include user in cache key
    queryFn: async () => {
      if (!user) return []; // if logged out, return empty cart
      const { data } = await api.get("/cart");
      if (!data || !data.data) return [];
      return data.data.cart_products || data.data.cartProducts || [];
    },
    enabled: !!user, // only fetch if logged in
  });

  // ✅ Refetch cart when user changes (login/logout)
  useEffect(() => {
    if (user) {
      refetch();
    } else {
      queryClient.removeQueries({ queryKey: ["cart"] }); //  clears all cart queries
    }
  }, [user, refetch, queryClient]);

  const addToCart = useMutation({
    mutationFn: async ({ product, quantity }) => {
      const { data } = await api.post("/cart", {
        product_id: product.id,
        quantity,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.id]);
    },
  });

  const updateCartItem = useMutation({
    mutationFn: async ({ cartProductId, quantity }) => {
      const { data } = await api.put(`/cart/${cartProductId}`, { quantity });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.id]);
    },
  });

  const removeFromCart = useMutation({
    mutationFn: async (cartProductId) => {
      const { data } = await api.delete(`/cart/${cartProductId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.id]);
    },
  });

  return {
    cartItems: cartItems || [],
    isLoading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
  };
}
