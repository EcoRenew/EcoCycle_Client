import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
// fa-light

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

  return (
    <section className="min-h-screen py-24 px-6 text-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
          About <span>EcoCycle</span>
        </h1>

        {/* Intro */}
        <p className="text-lg md:text-xl text-center leading-relaxed text-gray-500 max-w-3xl mx-auto mb-20">
          EcoCycle is dedicated to creating a sustainable future through
          innovative recycling solutions. Our mission is to empower individuals
          and businesses to reduce waste and protect our planet.
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
              <p className="text-lg leading-relaxed text-gray-500">
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
              <p className="text-lg leading-relaxed text-gray-500">
                To be the trusted partner for individuals and businesses seeking
                to make a positive change through responsible recycling
                practices.
              </p>
            </div>
          </div>

          {/* Right Side: Values */}
          <div className="bg-white dark:bg-transparent rounded-2xl shadow-lg border border-gray-100 dark:border-none p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Values</h2>
            <ul className="grid gap-6">
              {values.map((value, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition rounded-lg p-3"
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-2xl mt-1 text-ecoGreen"
                  />
                  <p>
                    <span className="font-semibold">{value.title}:</span>
                    {value.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
