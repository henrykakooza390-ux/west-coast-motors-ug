import { Link } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { getFavorites } from "../utils/favorites";
import { useState } from "react";

export default function NavBar() {
  const favoriteCount = getFavorites().length;

  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (
    <nav
      className="
      sticky top-0 z-50
      bg-white/90
      backdrop-blur-xl
      border-b border-gray-200
      shadow-sm
      "
    >
      <div
        className="
        max-w-7xl mx-auto
        px-6
        h-20
        flex items-center justify-between
        "
      >
        {/* LOGO */}

        <Link to="/">
          <h1
            className="
            text-2xl md:text-3xl
            font-black
            text-blue-600
            "
          >
            CarConnectUG
          </h1>
        </Link>

        {/* DESKTOP MENU */}

        <div
          className="
          hidden md:flex
          gap-8
          items-center
          font-medium
          "
        >
          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/search"
            className="hover:text-blue-600 transition"
          >
            Browse Cars
          </Link>

          <Link
            to="/submit-vehicle"
            className="hover:text-blue-600 transition"
          >
            Sell Car
          </Link>

          <Link
            to="/compare"
            className="hover:text-blue-600 transition"
          >
            Compare
          </Link>

          <Link
            to="/favorites"
            className="
            relative
            flex items-center gap-2
            hover:text-red-500
            transition
            "
          >
            <Heart size={20} />

            Favorites

            {favoriteCount > 0 && (
              <span
                className="
                absolute
                -top-2
                -right-4
                bg-red-500
                text-white
                text-xs
                rounded-full
                min-w-[20px]
                h-5
                flex items-center justify-center
                px-1
                "
              >
                {favoriteCount}
              </span>
            )}
          </Link>

          <Link
            to="/admin"
            className="
            bg-[#2563EB]
            hover:bg-[#0A1E4D]
            text-white
            px-5 py-2
            rounded-xl
            font-bold
            transition
            "
          >
            Admin
          </Link>
        </div>

        {/* MOBILE BUTTON */}

        <button
          className="md:hidden"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >
          {mobileMenu ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (
        <div
          className="
          md:hidden
          px-6 pb-6
          flex flex-col gap-5
          bg-white
          shadow-xl
          "
        >
          <Link
            to="/"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </Link>

          <Link
            to="/search"
            onClick={() => setMobileMenu(false)}
          >
            Browse Cars
          </Link>

          <Link
            to="/submit-vehicle"
            onClick={() => setMobileMenu(false)}
          >
            Sell Car
          </Link>

          <Link
            to="/compare"
            onClick={() => setMobileMenu(false)}
          >
            Compare
          </Link>

          <Link
            to="/favorites"
            onClick={() => setMobileMenu(false)}
          >
            Favorites ({favoriteCount})
          </Link>

          <Link
            to="/admin"
            onClick={() => setMobileMenu(false)}
            className="
            bg-[#2563EB]
            text-white
            py-3
            rounded-xl
            text-center
            font-bold
            "
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}