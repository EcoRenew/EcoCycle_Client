import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({
    recycling: {
      "what-materials": false,
      "how-prepare": false,
    },
    donations: {
      "what-items": false,
      "schedule-pickup": false,
    },
    account: {},
  });

  const toggleItem = (section, item) => {
    setOpenItems((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [item]: !prev[section][item],
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <div className="text-ecoGreen uppercase tracking-wider font-medium mb-2">
              GOT QUESTIONS?
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              We've Got Answers.
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Find answers to common questions about recycling, donations, and
              your account. If you can't find what you're looking for, feel free to
              contact us.
            </p>
            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="People recycling"
              className="rounded-lg shadow-lg w-full object-cover h-64 md:h-auto"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Recycling
            </h2>

            <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleItem("recycling", "what-materials")}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  What materials can I recycle?
                </span>
                <FontAwesomeIcon
                  icon={openItems.recycling["what-materials"] ? faChevronUp : faChevronDown}
                  className="text-ecoGreen"
                />
              </button>

              {openItems.recycling["what-materials"] && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">
                    We accept a wide range of materials including paper, cardboard,
                    plastic bottles and jugs, glass bottles and jars, and metal cans. For a
                    detailed list, please visit our 'What to Recycle' page.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleItem("recycling", "how-prepare")}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  How do I prepare my items?
                </span>
                <FontAwesomeIcon
                  icon={openItems.recycling["how-prepare"] ? faChevronUp : faChevronDown}
                  className="text-ecoGreen"
                />
              </button>

              {openItems.recycling["how-prepare"] && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">
                    For most recyclables, you should rinse them clean of food residue and remove any non-recyclable components. Flatten cardboard boxes, and make sure all containers are empty and dry. Remove caps from bottles unless specified otherwise by your local recycling guidelines.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Donations
            </h2>

            <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleItem("donations", "what-items")}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  What items can I donate?
                </span>
                <FontAwesomeIcon
                  icon={openItems.donations["what-items"] ? faChevronUp : faChevronDown}
                  className="text-ecoGreen"
                />
              </button>

              {openItems.donations["what-items"] && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">
                    We accept gently used clothing, household items, electronics, furniture, and more. All items should be in good working condition. We cannot accept items that are broken, heavily soiled, or missing essential parts.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleItem("donations", "schedule-pickup")}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  How do I schedule a donation pickup?
                </span>
                <FontAwesomeIcon
                  icon={openItems.donations["schedule-pickup"] ? faChevronUp : faChevronDown}
                  className="text-ecoGreen"
                />
              </button>

              {openItems.donations["schedule-pickup"] && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">
                    You can schedule a donation pickup through our website or mobile app. Simply create an account, list the items you wish to donate, and select a convenient pickup date and time. Our team will arrive at your location during the scheduled time to collect your donations.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Account
            </h2>

            <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleItem("account", "create-account")}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  How do I create an account?
                </span>
                <FontAwesomeIcon
                  icon={openItems.account["create-account"] ? faChevronUp : faChevronDown}
                  className="text-ecoGreen"
                />
              </button>

              {openItems.account["create-account"] && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">
                    Creating an account is easy! Click on the "Sign Up" button in the top right corner of our website. Fill out the registration form with your name, email address, and create a password. Once you submit the form, you'll receive a verification email. Click the link in the email to verify your account, and you're all set!
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleItem("account", "track-points")}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  How do I track my recycling points?
                </span>
                <FontAwesomeIcon
                  icon={openItems.account["track-points"] ? faChevronUp : faChevronDown}
                  className="text-ecoGreen"
                />
              </button>

              {openItems.account["track-points"] && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">
                    You can track your recycling points by logging into your account and visiting the "My Points" section on your dashboard. This page displays your current point balance, point history, and available rewards. Points are automatically added to your account when you recycle items at our centers or through our pickup service.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you couldn't find the answer you were looking for, please don't hesitate to contact our support team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-ecoGreen hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;