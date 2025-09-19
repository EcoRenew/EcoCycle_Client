import React from "react";
import { Link } from "react-router-dom";
import successImg from "../../assets/success.jpeg";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <img
        src={successImg}
        alt="Success"
        className="w-24 h-24 mb-6 object-contain"
      />
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-700 mb-2">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
