import React from "react";
import ProductList from "../components/ProductsList";
import Header from "../assets/storeHeader.png";
import { useProducts } from "../hooks/useProducts";
const StorePage = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <p className="text-center text-lg">Loading products...</p>;
  }

  return (
    <div className="min-h-screen ">
      {/* Banner Section */}
      <header
        className="relative mx-auto mt-12 max-w-7xl h-[60vh] rounded-2xl overflow-hidden shadow-xl bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${Header})`,
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
            Transforming Waste into Wonders
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Explore our collection of eco-friendly products, each with a unique
            story of recycled origin.
          </p>
        </div>
      </header>

      {/* Products Section (full width, not aligned with banner) */}
      <main>
        <ProductList products={products} />
      </main>
    </div>
  );
};

export default StorePage;
