import { useState, useEffect, useRef } from "react";

const slidesData = [
  {
    id: 1,
    title: "Transform Waste into Wonder",
    text: "Join the recycling revolution and help create a sustainable future for our planet. Every bottle, can, and paper makes a difference.",
    buttonText: "Start Recycling Today",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    title: "Reduce. Reuse. Recycle.",
    text: "Discover innovative ways to give new life to everyday items. Small actions lead to big environmental impact.",
    buttonText: "Learn More",
    image:
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
  },
  {
    id: 3,
    title: "Planet Earth Needs You",
    text: "Be part of the solution. Together we can reduce waste, protect wildlife, and preserve our beautiful planet for future generations.",
    buttonText: "Join Our Mission",
    image:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
];

const HeroSectionComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const totalSlides = slidesData.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const previousSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const showSlide = (index) => setCurrentSlide(index);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(nextSlide, 8000);
  };

  const resetAutoSlide = () => {
    clearInterval(slideInterval.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(slideInterval.current);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => clearInterval(slideInterval.current)}
      onMouseLeave={resetAutoSlide}
    >
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ${
              index === currentSlide ? "scale-100" : "scale-110"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-green-600/30" />
          {/* Content */}
          <div className="relative z-10 text-center text-white max-w-2xl px-6">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg transform transition-all duration-1000 delay-500 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {slide.title}
            </h1>
            <p
              className={`text-lg md:text-2xl mb-8 drop-shadow-md transform transition-all duration-1000 delay-700 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {slide.text}
            </p>
            <a
              href="#"
              className={`inline-block bg-[#38af44] hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg uppercase shadow-lg transition-all duration-300 transform ${
                index === currentSlide
                  ? "opacity-100 translate-y-0 delay-1000"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={previousSlide}
        className="absolute top-[70%] md:top-1/2 left-3 md:left-6 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 
             rounded-full bg-white/20 border border-white/30 text-white text-xl md:text-2xl 
             flex items-center justify-center backdrop-blur-sm 
             hover:bg-green-600 hover:border-green-500 transition-transform hover:scale-110 z-20"
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-[70%] md:top-1/2 right-3 md:right-6 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 
             rounded-full bg-white/20 border border-white/30 text-white text-xl md:text-2xl 
             flex items-center justify-center backdrop-blur-sm 
             hover:bg-green-600 hover:border-green-500 transition-transform hover:scale-110 z-20"
      >
        &#8250;
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => showSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === currentSlide
                ? "bg-[#38af44] scale-125"
                : "bg-white/50 hover:bg-green-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSectionComponent;
