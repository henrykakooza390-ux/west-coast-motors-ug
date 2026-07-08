import { Link } from "react-router-dom";
import siteConfig from "../config/siteConfig";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src={siteConfig.heroImage}
          className="w-full h-full object-cover scale-105"
          alt="Luxury vehicle"
        />

        {/* PREMIUM WHITE/BLACK BLEND */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-black/85" />

        {/* BLACK DEPTH */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20" />

        {/* RED ACCENT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(185,28,28,0.22),transparent_40%)]" />

        {/* BLACK ACCENT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(0,0,0,0.12),transparent_35%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40">

        <div className="max-w-3xl">

          {/* BRAND */}
          <div className="mb-6">

           <h2
  className="
  text-4xl
  sm:text-5xl
  md:text-6xl
  lg:text-7xl
  xl:text-8xl
  font-black
  uppercase
  tracking-[0.10em]
  leading-none
  text-balance
  drop-shadow-lg
"
>
              <span className="text-brand-black">
                WEST COAST MOTORS
              </span>

              {" "}

              <span className="text-brand-red">
                UG
              </span>
            </h2>

            {/* PREMIUM DIVIDER */}
            <div className="mt-4 w-28 h-1 rounded-full bg-gradient-to-r from-brand-red via-black to-transparent" />

          </div>

          {/* TITLE */}
          <h1
            className="
  mt-5
  text-3xl
  sm:text-4xl
  md:text-5xl
  lg:text-6xl
  font-extrabold
  leading-tight
  tracking-tight
  text-brand-black
  drop-shadow-sm
"
          >
            Drive Luxury.
            <br />

            <span className="text-brand-red">
              Own Power.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              text-brand-textMuted
              mt-7
              text-lg
              md:text-xl
              leading-relaxed
              max-w-2xl
            "
          >
            Premium verified vehicles in Uganda's most trusted
            automotive marketplace. Experience luxury,
            performance, and reliability in one place.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              to="/search"
              className="
                bg-brand-red
                hover:bg-brand-redDark
                text-white
                px-8
                py-4
                rounded-xl
                font-bold
                shadow-xl
                hover:shadow-2xl
                transition-all
                duration-300
                hover:scale-105
                text-center
              "
            >
              Browse Cars
            </Link>

            <Link
              to="/submit-vehicle"
              className="
                bg-white/90
                backdrop-blur-sm
                text-brand-black
                border
                border-black/15
                px-8
                py-4
                rounded-xl
                font-bold
                hover:border-brand-red
                hover:text-brand-red
                hover:shadow-lg
                transition-all
                duration-300
                text-center
              "
            >
              Sell Your Car
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}