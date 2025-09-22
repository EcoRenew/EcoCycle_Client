import { createContext, useContext } from "react";

export const CartContext = createContext(null);

export const useCartContext = () => {
  return useContext(CartContext);
};
