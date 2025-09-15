import React from "react";
import ProductList from "../components/ProductsList";
import Header from "../assets/StoreHeader.png";
import { useProducts } from "../hooks/useProducts";
const StorePage = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p className="text-center text-lg">Loading products...</p>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Failed to load products.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen ">
      {/* Banner Section */}
      <header className="relative mx-auto mt-12 max-w-7xl h-[80vh] rounded-2xl overflow-hidden shadow-xl">
        <img
          src={Header}
          alt="Store Header"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </header>

      <main>
        <ProductList products={products} />
      </main>
    </div>
  );
};

export default StorePage;
