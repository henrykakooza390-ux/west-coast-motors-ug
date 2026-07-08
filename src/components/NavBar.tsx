import { Link } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import siteConfig from "../config/siteConfig";
import { getFavorites } from "../utils/favorites";

export default function NavBar() {
  const favoriteCount = getFavorites().length;

  const [mobileMenu, setMobileMenu] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50

        transition-all
        duration-500
        ease-out

        ${
          scrolled
            ? `
              bg-white/45
              backdrop-blur-2xl
              shadow-2xl
              border-b
              border-white/20
              translate-y-0
            `
            : `
              bg-white/90
              backdrop-blur-xl
              shadow-sm
              border-b
              border-brand-border
              translate-y-0
            `
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
<Link
  to="/"
  className="
    flex
    items-center
    h-full
    w-[180px]
    md:w-[210px]
    lg:w-[240px]
    overflow-hidden
  "
>
  <img
    src={siteConfig.logo}
    alt={siteConfig.companyName}
    className="
      h-[82px]
      md:h-[92px]
      lg:h-[100px]
      w-auto
      max-w-none
      object-contain
      -translate-y-1
      transition-all
      duration-300
      hover:scale-105
    "
  />
</Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 font-medium text-brand-black">

          <Link
            to="/"
            className="
              hover:text-brand-red
              transition-all
              duration-300
            "
          >
            Home
          </Link>

          <Link
            to="/search"
            className="
              hover:text-brand-red
              transition-all
              duration-300
            "
          >
            Browse Cars
          </Link>

          <Link
            to="/submit-vehicle"
            className="
              hover:text-brand-red
              transition-all
              duration-300
            "
          >
            Sell Car
          </Link>

          <Link
            to="/compare"
            className="
              hover:text-brand-red
              transition-all
              duration-300
            "
          >
            Compare
          </Link>

          {/* FAVORITES */}
          <Link
            to="/favorites"
            className="
              relative
              flex
              items-center
              gap-2
              hover:text-brand-red
              transition-all
              duration-300
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
                  bg-brand-red
                  text-white
                  text-xs
                  rounded-full
                  min-w-[20px]
                  h-5
                  flex
                  items-center
                  justify-center
                  px-1
                "
              >
                {favoriteCount}
              </span>
            )}
          </Link>

          {/* ADMIN */}
          <Link
            to="/admin"
            className="
              bg-gradient-to-r
              from-brand-black
              to-brand-red

              hover:from-black
              hover:to-brand-redDark

              text-white
              px-6
              py-2.5
              rounded-xl
              font-bold

              shadow-lg
              hover:shadow-2xl

              transition-all
              duration-300

              hover:scale-105
            "
          >
            Admin
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="
            md:hidden
            text-brand-black
            transition
          "
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
            px-6
            pb-6
            flex
            flex-col
            gap-5
            bg-white/95
            backdrop-blur-xl
            shadow-xl
            border-t
            border-brand-border
            animate-in
          "
        >
          <Link
            to="/"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Home
          </Link>

          <Link
            to="/search"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Browse Cars
          </Link>

          <Link
            to="/submit-vehicle"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Sell Car
          </Link>

          <Link
            to="/compare"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Compare
          </Link>

          <Link
            to="/favorites"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            Favorites ({favoriteCount})
          </Link>

          <Link
            to="/admin"
            onClick={() =>
              setMobileMenu(false)
            }
            className="
              bg-gradient-to-r
              from-brand-black
              to-brand-red
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