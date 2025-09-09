import Collab from "../assets/Collaboration-bro.svg";
const CollabSectionComponent = () => {
  return (
    <section className="relative mb-10 py-24  " id="business-collab">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 ">
            Partner With Us
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10  leading-relaxed">
            Whether you’re a
            <span className="font-semibold text-ecoGreen">company</span> or a
            <span className="font-semibold text-ecoGreen">
              charity organization
            </span>
            , we’d love to collaborate with you to build a cleaner, more
            sustainable world.
          </p>
          {/* Contact Us */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <a
              href="#"
              className="px-10 py-4 border-2 border-ecoGreen text-ecoGreen font-semibold rounded-xl
             transition-all duration-300
             hover:bg-ecoGreen/10 hover:text-ecoGreen/90
             dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-ecoGreen"
            >
              Contact Us
            </a>

            <a
              href="#"
              className="px-10 py-4 bg-ecoGreen text-white font-semibold rounded-xl shadow-md hover:bg-ecoGreen/90 transition-all duration-300"
            >
              Register Your Organization
            </a>
          </div>
        </div>

        <div className="hidden lg:flex justify-center lg:justify-end">
          <img
            src={Collab}
            alt="Collaboration illustration"
            className="w-full max-w-lg lg:max-w-xl drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
export default CollabSectionComponent;
