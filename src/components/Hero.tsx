import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="
      relative
      overflow-hidden
      min-h-screen
      flex
      items-center
      bg-[#07152f]
      "
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/cars/hero-car.jpg"
          alt="Mercedes G Wagon"
          className="
          absolute
          right-0
          bottom-0
          w-full
          h-full
          object-cover
          object-right
          "
        />
      </div>

      {/* OVERLAYS */}

      <div
        className="
        absolute inset-0
        bg-gradient-to-r
        from-[#07152f]
        via-[#0A1E4D]/95
        to-[#103C8F]/50
        "
      />

      <div
        className="
        absolute inset-0
        bg-gradient-to-b
        from-[#2563EB]/20
        via-transparent
        to-[#04142f]/90
        "
      />

      {/* GLOWS */}

      <div
        className="
        absolute
        -top-40
        -left-40
        w-[700px]
        h-[700px]
        rounded-full
        bg-blue-400/20
        blur-[180px]
        "
      />

      <div
        className="
        absolute
        right-0
        top-0
        w-[600px]
        h-[600px]
        rounded-full
        bg-white/10
        blur-[180px]
        "
      />

      {/* CONTENT */}

      <div
        className="
        relative z-20
        max-w-7xl
        mx-auto
        px-6
        py-24
        w-full
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* BADGE */}

          <div
            className="
            inline-flex
            items-center
            gap-2
            px-5
            py-3
            rounded-full
            border border-white/20
            bg-white/10
            backdrop-blur-xl
            text-white
            text-sm md:text-base
            font-semibold
            mb-8
            "
          >
            ✓ Trusted & Verified Marketplace
          </div>

          {/* TITLE */}

          <h1
            className="
            text-5xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            font-black
            leading-[0.95]
            text-white
            "
          >
            Find Your
            <br />

            Dream

            <span className="block text-blue-400">
              Car In Uganda
            </span>
          </h1>

          {/* SUBTITLE */}

          <p
            className="
            mt-8
            text-base
            md:text-2xl
            text-blue-100
            max-w-2xl
            leading-relaxed
            "
          >
            Browse verified vehicles from trusted sellers,
            compare prices and discover the perfect car
            for your lifestyle.
          </p>

          {/* BUTTONS */}

          <div
            className="
            flex
            flex-col
            sm:flex-row
            gap-4
            mt-12
            "
          >
            <Link
              to="/search"
              className="
              text-center
              px-10
              py-5
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-bold
              shadow-2xl
              transition
              "
            >
              Browse Cars
            </Link>

            <Link
              to="/submit-vehicle"
              className="
              text-center
              px-10
              py-5
              rounded-2xl
              border border-white/30
              bg-white/10
              backdrop-blur-xl
              text-white
              font-bold
              hover:bg-white/20
              transition
              "
            >
              Sell Your Car
            </Link>
          </div>

          {/* STATS */}

          <div
            className="
            grid
            grid-cols-3
            gap-6
            mt-16
            max-w-xl
            "
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white">
                500+
              </h3>

              <p className="text-blue-200 mt-2 text-sm md:text-base">
                Verified Cars
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white">
                100+
              </h3>

              <p className="text-blue-200 mt-2 text-sm md:text-base">
                Trusted Sellers
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white">
                50+
              </h3>

              <p className="text-blue-200 mt-2 text-sm md:text-base">
                Dealers
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FADE */}

      <div
        className="
        absolute
        bottom-0
        left-0
        right-0
        h-40
        bg-gradient-to-t
        from-white
        to-transparent
        "
      />
    </section>
  );
}