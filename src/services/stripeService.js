// services/stripeService.js
import axios from "axios";

export const createStripeCheckoutSession = async (products, token) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/products/pay`,
      { products },
      {
        headers: {
          Authorization: `Bearer ${token}`, // <-- use the token
        },
      }
    );
    return data; // { id, url }
  } catch (error) {
    console.error("Stripe API error:", error);
    throw error;
  }
};
