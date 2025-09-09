import Plastic from "../assets/plastic.png";
import Metal from "../assets/metal.png";
import Paper from "../assets/paper.png";
import Electronics from "../assets/electronics.png";
import Oil from "../assets/oil.png";
import Cardboard from "../assets/carton.png";

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
    {
      id: 6,
      icon: Cardboard,
      title: "Cardboard",
      text: "Recyclable cardboard boxes and packaging materials.",
    },
  ];

  return (
    <section className="py-24  " id="categories">
      <div className="w-full text-center px-4">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold  mb-6">
          ♻️ What We Collect
        </h2>
        <p className=" max-w-2xl mx-auto mb-16 text-lg">
          We collect various types of recyclable materials to ensure they are
          reused responsibly.
        </p>

        {/* Categories  */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-10">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group dark:bg-[#1B3124] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden relative"
            >
              {/* Image */}
              <div className="bg-gray-50 overflow-hidden">
                <img
                  src={cat.icon}
                  alt={cat.title}
                  className="w-full h-[26rem] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title & Text */}
              <div className="p-8 text-center relative z-10">
                <h3 className="text-xl font-bold  mb-3 group-hover:text-ecoGreen transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className=" text-base leading-relaxed">{cat.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesComponent;
