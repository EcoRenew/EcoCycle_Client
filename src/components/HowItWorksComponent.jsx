import Payment from "../assets/Money income-bro.svg";
import Recycle from "../assets/Recycling-bro.svg";
import Signup from "../assets/Sign up-bro.svg";

const HowItWorksComponent = () => {
  const steps = [
    {
      id: 1,
      icon: Signup,
      title: "Register",
      text: "Create your free account to start recycling and tracking your impact.",
    },
    {
      id: 2,
      icon: Recycle,
      title: "Upload Waste",
      text: "Upload your recyclable waste details and earn points, gifts, and badges.",
    },
    {
      id: 3,
      icon: Payment,
      title: "Get Paid",
      text: "We collect your recyclables and pay you while you help the planet.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Getting started is simple! Just follow these three easy steps to
          recycle, earn rewards, and make a difference 🌍
        </p>

        {/* Steps */}
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 flex flex-col items-center relative"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#38af44] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md">
                {index + 1}
              </div>

              <img
                src={step.icon}
                alt={step.title}
                className="w-36 h-36 object-contain mb-6 transition-transform duration-300 group-hover:scale-110"
              />

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksComponent;
