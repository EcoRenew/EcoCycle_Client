import { useParams } from "react-router-dom";
import { categoryContent } from "../data/categoryContent";
import RecycleSection from "../components/RecycleCategories/RecycleSection";
import Banner from "../components/RecycleCategories/Banner";
import CategoryCard from "../components/CategoryCard/CategoryCard";

const CategoryPage = () => {
  const { type } = useParams();

  const content = categoryContent[type];
  if (!content)
    return <div className="text-center mt-20">Category not found</div>;

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-32"
        style={{ backgroundImage: `url(/images/${content.headerImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl font-bold">{content.title}</h1>
        </div>
      </section>

      {/* Recycle Section */}
      <RecycleSection
        heading={content.videoSection.heading}
        description={content.videoSection.description}
        videoUrl={content.videoSection.videoUrl}
      />

      {/* Banner Section */}
      <Banner />

      {/* CategoryCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-10">
        <CategoryCard
          data={{
            name: "HP Laptop 15-dy Series",
            imageUrl:
              "https://via.placeholder.com/300x160/4A90E2/FFFFFF?text=Product+Image",
            price: "1900 points / piece",
            points: "1900+ points",
          }}
        />
        <CategoryCard
          data={{
            name: "HP Laptop 15-dy Series",
            imageUrl:
              "https://via.placeholder.com/300x160/4A90E2/FFFFFF?text=Product+Image",
            price: "1900 points / piece",
            points: "1900+ points",
          }}
        />
        <CategoryCard
          data={{
            name: "HP Laptop 15-dy Series",
            imageUrl:
              "https://via.placeholder.com/300x160/4A90E2/FFFFFF?text=Product+Image",
            price: "1900 points / piece",
            points: "1900+ points",
          }}
        />
      </div>
    </>
  );
};

export default CategoryPage;

