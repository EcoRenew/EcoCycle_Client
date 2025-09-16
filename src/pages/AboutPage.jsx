import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import Sarah from "../assets/woman.png";
import Mark from "../assets/man.png";
import PagesHeader from "../components/pagesHeader";
const AboutPage = () => {
  const values = [
    {
      title: "Integrity",
      desc: "We operate with transparency and honesty in all our actions.",
    },
    {
      title: "Innovation",
      desc: "We continuously seek new and improved ways to recycle and reduce waste.",
    },
    {
      title: "Sustainability",
      desc: "We are committed to long-term environmental responsibility.",
    },
    {
      title: "Community",
      desc: "We believe in the power of collaboration and engagement to achieve our goals.",
    },
  ];
  const stories = [
    {
      title: "Sarah's Journey to Zero Waste",
      desc: "Sarah, a busy mom, shares how she transformed her household waste management with EcoCycle's guidance, embracing a more sustainable lifestyle.",
      image: Sarah, // add your image path
    },
    {
      title: "Mark's Business Goes Green",
      desc: "Mark, a local cafe owner, implemented EcoCycle's business recycling program, significantly reducing his environmental footprint and inspiring his community.",
      image: Mark, // add your image path
    },
  ];
  return (
    <>
      <PagesHeader />
      <section className="min-h-screen py-24 px-6 text-gray-800 dark:text-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-16">
            About <span>EcoCycle</span>
          </h1>

          {/* Intro */}
          <p className="text-lg md:text-xl text-center leading-relaxed dark:text-gray-400 text-gray-500 max-w-3xl mx-auto mb-20">
            EcoCycle is dedicated to creating a sustainable future through
            innovative recycling solutions. Our mission is to empower
            individuals and businesses to reduce waste and protect our planet.
          </p>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Side: Mission + Vision */}
            <div className="space-y-16">
              {/* Mission */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Our Mission
                </h2>
                <p className="text-lg leading-relaxed dark:text-gray-400 text-gray-500">
                  To lead the way in recycling innovation, providing accessible
                  and effective solutions that minimize environmental impact and
                  promote a circular economy.
                </p>
              </div>

              {/* Vision */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Our Vision
                </h2>
                <p className="text-lg leading-relaxed dark:text-gray-400 text-gray-500">
                  To be the trusted partner for individuals and businesses
                  seeking to make a positive change through responsible
                  recycling practices.
                </p>
              </div>
            </div>

            {/* Right Side: Values */}
            <div className="rounded-2xl shadow-lg border border-gray-100 dark:border-none p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Our Values
              </h2>
              <ul className="grid gap-6">
                {values.map((value, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 rounded-md p-3"
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-2xl mt-1 text-ecoGreen"
                    />
                    <div>
                      <span className="font-semibold">{value.title}: </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {value.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Inspiring Stories Section */}
          <div className=" py-24 my-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
              Inspiring Stories of Change
            </h2>
            <p className="text-center text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Discover how our users and partners are making a tangible impact
              on the environment. Their stories fuel our mission and showcase
              the power of collective action in recycling.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {stories.map((story, idx) => (
                <div
                  key={idx}
                  className="group bg-white dark:bg-[#1B3124] rounded-3xl shadow-md border border-gray-100 dark:border-none p-6 hover:shadow-lg transition flex flex-col items-center text-center"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-[35rem] object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-4 transition-colors group-hover:text-ecoGreen">
                    {story.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {story.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
