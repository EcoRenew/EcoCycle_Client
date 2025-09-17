import ProductList from "../components/ProductsList";
import Header from "../assets/StoreHeader.png";
import { useProducts } from "../hooks/useProducts";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StorePage = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-ecoGreen to-green-500 rounded-2xl mb-6 shadow-lg animate-pulse">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-white text-4xl animate-spin"
            />
          </div>
        </div>
      </div>
    );
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
