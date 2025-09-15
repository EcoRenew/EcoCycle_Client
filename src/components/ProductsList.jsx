// src/components/ProductsList.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductsList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products available.</p>;
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 my-24">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductsList;
