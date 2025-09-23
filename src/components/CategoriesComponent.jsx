import Plastic from "../assets/plastic.png";
import Metal from "../assets/metal.png";
import Electronics from "../assets/electronics.png";
import Oil from "../assets/oil.png";
import Fabric from "../assets/fabric1.jpg";
import paperCartoon from "../assets/carton.png";
import { Link } from "react-router-dom";

const CategoriesComponent = () => {
  const categories = [
    {
      id: 1,
      icon: Plastic,
      title: "Plastic",
      text: "Recycle your bottles, containers, and packaging to help reduce plastic waste.",
    },
    {
      id: 2,
      icon: Metal,
      title: "Metals",
      text: "Give your cans, tins, and scrap metal a new life by recycling them here.",
    },
    {
      id: 3,
      icon: paperCartoon,
      title: "Paper & Cardboard",
      text: "Turn old newspapers, office paper, and cardboard into reusable materials.",
    },
    {
      id: 4,
      icon: Electronics,
      title: "Electronics",
      text: "Safely recycle phones, laptops, and small appliances to prevent e-waste.",
    },
    {
      id: 5,
      icon: Oil,
      title: "Cooking Oil",
      text: "Dispose of used cooking oil responsibly so it can be recycled safely.",
    },
    {
      id: 6,
      icon: Fabric,
      title: "Fabrics & Textiles",
      text: "Donate old clothes, linens, and textiles for recycling or reuse.",
    },
  ];

  return (
    <section className="py-24" id="categories">
      <div className="w-full text-center px-4">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Recycle with Us
        </h2>
        <p className="max-w-2xl mx-auto mb-16 text-lg text-gray-700 dark:text-gray-300">
          Click on a category below to safely recycle your items and give them a
          new life. Together, we can reduce waste and protect the planet.
        </p>

        {/* Categories  */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-10">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white dark:bg-[#1B3124] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden relative"
            >
              {/* Clickable card area (image + text) */}
              <Link
                to="/recycling-request"
                state={{ category: cat.title }}
                className="block"
                aria-label={`Open recycling request for ${cat.title}`}
              >
                <div className="bg-gray-50 overflow-hidden">
                  <img
                    src={cat.icon}
                    alt={cat.title}
                    className="w-full h-[26rem] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8 text-center relative z-10">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-ecoGreen transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-base leading-relaxed">{cat.text}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesComponent;
