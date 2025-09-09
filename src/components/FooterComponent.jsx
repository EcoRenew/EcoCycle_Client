import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterComponent = () => {
  return (
    <footer className=" bg-[#1B3124] dark:bg-bg text-white pt-16 pb-10 px-6 md:px-12 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faRecycle}
                className="text-[#38af44] animate-spin-slow"
                size="2x"
              />
              <h2 className="text-white text-2xl font-extrabold">EcoCycle</h2>
            </div>
            <p className="text-slate-300 text-base leading-relaxed">
              Making recycling fun & rewarding for everyone.
            </p>
            <button className="flex items-center justify-center rounded-full px-4 py-2 md:px-6 md:py-3 bg-amber-400 text-gray-900 font-semibold tracking-wide hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 mt-2 w-full sm:w-auto text-sm md:text-base">
              Get Started
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-ecoGreen mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "How It Works",
                "What to Recycle",
                "Find a Center",
                "About Us",
                "Contact Us",
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    className="text-slate-300 hover:text-white transition-colors duration-300"
                    href="#"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-4">
              Follow Our Journey
            </h3>
            <p className="text-slate-300 mb-4">
              Get your daily dose of green inspiration!
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white hover:text-pink-400 transition-colors duration-300"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="h-6 w-6 md:h-8 md:w-8 hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="#"
                className="text-white hover:text-sky-400 transition-colors duration-300"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="h-6 w-6 md:h-8 md:w-8 hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="#"
                className="text-white hover:text-red-500 transition-colors duration-300"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="h-6 w-6 md:h-8 md:w-8 hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-ecoGreen mb-4">
              Stay Updated
            </h3>
            <p className="text-slate-300 mb-4">
              Join our newsletter for recycling tips and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#38af44] text-sm md:text-base"
              />
              <button className="bg-ecoGreen px-4 py-2 md:px-5 md:py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 text-sm md:text-base">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-700 mt-12 pt-6 text-center text-slate-400 text-sm">
          <p>
            © {new Date().getFullYear()} EcoCycle. Making the world a little
            brighter, one bottle at a time 🌍.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
