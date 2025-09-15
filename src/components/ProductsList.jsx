// src/components/ProductsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from Laravel API
    axios
      .get("http://127.0.0.1:8000/api/products") // adjust if backend runs elsewhere
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 my-24">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductsList;
