import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cancelPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
          setError("No session ID found in URL");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/payment/cancel`,
          { session_id: sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message) {
          setSuccess(true);
        }
      } catch (err) {
        console.error("Payment cancellation error:", err);
        setError(err.response?.data?.error || "Failed to process cancellation");
      } finally {
        setLoading(false);
      }
    };

    cancelPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-yellow-600 mb-4">
            Processing Cancellation...
          </h1>
          <p className="text-gray-700 mb-2">
            Please wait while we process your payment cancellation.
          </p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Cancellation Failed
          </h1>
          <p className="text-gray-700 mb-2">{error}</p>
          <Link
            to="/cart"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition mr-2"
          >
            Return to Cart
          </Link>
          <Link
            to="/"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <div className="w-24 h-24 mb-6 mx-auto flex items-center justify-center bg-red-100 rounded-full">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-4">
          Your payment has been cancelled. No charges have been made to your
          account.
          {success && " Your cart items have been preserved."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/cart"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Return to Cart
          </Link>
          <Link
            to="/"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
