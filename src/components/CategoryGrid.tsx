import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const bodyTypes = [
  "SUV",
  "Sedan",
  "Pickup",
  "Luxury",
  "Hatchback",
  "Van",
  "Crossover",
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}

        <div className="mb-14 text-center md:text-left">

          <p className="text-blue-600 font-semibold tracking-wide">
            Vehicle Categories
          </p>

          <h2 className="text-3xl md:text-5xl font-black mt-2">
            Browse By Body Type
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl">
            Explore vehicles by category and discover the
            perfect car for your lifestyle.
          </p>

        </div>

        {/* GRID */}

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5 md:gap-8
          "
        >
          {bodyTypes.map((item) => (

            <motion.div
              key={item}
              whileHover={{
                scale: 1.04,
                y: -8,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                navigate(`/cars/${item.toLowerCase()}`)
              }
              className="
              bg-white
              rounded-[32px]
              shadow-lg
              p-8 md:p-10
              text-center
              cursor-pointer
              border border-gray-100
              hover:shadow-2xl
              transition
              "
            >

              {/* ICON */}

              <div
                className="
                h-16
                w-16
                mx-auto
                mb-5
                rounded-full
                bg-blue-50
                flex items-center justify-center
                text-blue-600
                text-2xl
                font-black
                "
              >
                {item[0]}
              </div>

              <h3
                className="
                text-lg md:text-xl
                font-bold
                "
              >
                {item}
              </h3>

            </motion.div>

          ))}
        </div>

      </div>

    </section>
  );
}