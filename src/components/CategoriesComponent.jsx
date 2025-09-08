import Plastic from "../assets/plastic.jpg";
import Metal from "../assets/metal.jpg";
import Paper from "../assets/paper.jpg";
import Electronics from "../assets/electronics.jpg";
import Oil from "../assets/oil.jpg";

const CategoriesComponent = () => {
  const categories = [
    {
      id: 1,
      icon: Plastic,
      title: "Plastic",
      text: "Bottles, containers, packaging, and other recyclable plastics.",
    },
    {
      id: 2,
      icon: Metal,
      title: "Metals",
      text: "Cans, tins, scrap metal, and other recyclable metal products.",
    },
    {
      id: 3,
      icon: Paper,
      title: "Papers",
      text: "Newspapers, cardboard, office paper, and magazines.",
    },
    {
      id: 4,
      icon: Electronics,
      title: "Electronics",
      text: "Phones, laptops, small appliances, and e-waste.",
    },
    {
      id: 5,
      icon: Oil,
      title: "Cooking Oil",
      text: "Used cooking oil, collected and recycled safely.",
    },
  ];

  return (
    <section className="py-20 bg-white" id="categories">
      <div className="w-full text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          What We Collect
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          We collect different types of recyclable materials to ensure they are
          reused responsibly.
        </p>

        {/* Categories Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 md:px-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 flex flex-col items-center p-6"
            >
              {/* Image */}
              <img
                src={cat.icon}
                alt={cat.title}
                className="w-60 h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain mb-6 transition-transform duration-300 group-hover:scale-105"
              />

              {/* Title & Text */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {cat.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{cat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesComponent;
