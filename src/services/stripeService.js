// services/stripeService.js
import axios from "axios";

export const createStripeCheckoutSession = async (products) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/products/pay`,
      { products },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Stripe API error:", error);
    throw error;
  }
};
