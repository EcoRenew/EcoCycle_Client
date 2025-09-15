import React from "react";
import {
  Mail,
  Phone,
  Instagram,
  Twitter,
  Leaf,
  Handshake,
  Recycle,
  HelpCircle,
} from "lucide-react";

const ContactPage = () => {
  const adventureOptions = [
    { Icon: Leaf, label: "Product Question" },
    { Icon: Handshake, label: "Partnership" },
    { Icon: Recycle, label: "Recycle Waste" },
    { Icon: HelpCircle, label: "General Inquiry" },
  ];

  const contactMethods = [
    { Icon: Mail, title: "Email Us", info: "support@ecocycle.com" },
    { Icon: Phone, title: "Call Us", info: "+1-555-123-4567" },
    { Icon: Instagram, title: "Follow Us", info: "@EcoCycle" },
    { Icon: Twitter, title: "Tweet Us", info: "@EcoCycle" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4 text-center">Get in Touch</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12 text-center max-w-xl">
        We're here to help! Choose your adventure below to find the best way to
        reach us.
      </p>

      {/* Choose Your Adventure */}
      <div className="shadow-md rounded-2xl p-8 w-full max-w-4xl text-center border dark:border-white bg-white dark:bg-[#1B3124] py-24 px-14 mb-16">
        <h2 className="text-xl font-semibold mb-6">Choose Your Adventure</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {adventureOptions.map((option) => {
            const Icon = option.Icon;
            return (
              <button
                key={option.label}
                className="flex flex-col items-center p-4 border dark:border-white rounded-xl hover:bg-gray-50 dark:hover:bg-[#25432E] transition"
              >
                <Icon className="w-8 h-8 mb-2" />
                <span className="font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition">
          Continue
        </button>
      </div>

      {/* Other Ways to Connect */}
      <h2 className="text-2xl font-bold mb-4 text-center mt-24">
        Other Ways to Connect
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-10 text-center">
        We're always happy to chat!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl w-full mb-24">
        {contactMethods.map((method) => {
          const Icon = method.Icon;
          return (
            <div
              key={method.title}
              className="bg-white dark:bg-[#1B3124] border dark:border-white shadow-md rounded-xl p-6 text-center"
            >
              <Icon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">{method.title}</h3>
              <p className="text-gray-400">{method.info}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactPage;
