import { Link } from "react-router-dom";
import siteConfig from "../config/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-[#07152f] text-white mt-16 sm:mt-20 overflow-hidden">

      {/* TOP AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

          {/* BRAND */}
          <div className="text-center sm:text-left">

            <h2 className="text-2xl sm:text-3xl font-black">
              {siteConfig.shortName}
            </h2>

            <p className="text-blue-100 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
              {siteConfig.tagline}
            </p>

            <p className="text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base">
              {siteConfig.address}
            </p>

          </div>

          {/* BROWSE */}
          <div className="text-center sm:text-left">

            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-5">
              Browse
            </h3>

            <div className="space-y-2 sm:space-y-3 text-blue-100 text-sm sm:text-base">

              <Link
                to="/search"
                className="block hover:text-white transition"
              >
                Browse Cars
              </Link>

              <Link
                to="/favorites"
                className="block hover:text-white transition"
              >
                Favorites
              </Link>

              <Link
                to="/compare"
                className="block hover:text-white transition"
              >
                Compare Vehicles
              </Link>

              <Link
                to="/submit-vehicle"
                className="block hover:text-white transition"
              >
                Sell Your Car
              </Link>

            </div>

          </div>

          {/* CATEGORIES */}
          <div className="text-center sm:text-left">

            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-5">
              Categories
            </h3>

            <div className="space-y-2 sm:space-y-3 text-blue-100 text-sm sm:text-base">

              <Link
                to="/cars/suv"
                className="block hover:text-white transition"
              >
                SUV
              </Link>

              <Link
                to="/cars/sedan"
                className="block hover:text-white transition"
              >
                Sedan
              </Link>

              <Link
                to="/cars/pickup"
                className="block hover:text-white transition"
              >
                Pickup
              </Link>

            </div>

          </div>

          {/* CONTACT */}
          <div className="text-center sm:text-left">

            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-5">
              Contact
            </h3>

            <div className="space-y-2 sm:space-y-3 text-blue-100 text-sm sm:text-base">

              <p>{siteConfig.phone}</p>

              <p>{siteConfig.email}</p>

              <p>{siteConfig.country}</p>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">

          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">

            <a href="#" className="hover:text-white transition text-center">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition text-center">
              Terms of Service
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}