import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useVehiclesContext } from "../context/VehiclesContext";
import {
  addToCompare,
  removeFromCompare,
  isInCompare,
} from "../utils/compare";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../utils/favorites";

export default function LatestArrivals() {
  const { vehicles, loading } = useVehiclesContext();
  const [, forceUpdate] = useState({});

  if (loading) return null;

  const latestVehicles = vehicles
    .filter((car: any) => car.status !== "archived")
    .sort((a: any, b: any) => Number(b.id) - Number(a.id))
    .slice(0, 6);

  if (latestVehicles.length === 0) return null;

  const toggleFavorite = (
    e: React.MouseEvent,
    id: string
  ) => {
    e.preventDefault();

    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }

    window.dispatchEvent(
      new CustomEvent("favoritesUpdated")
    );

    forceUpdate({});
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">

      {/* HEADER */}
      <div className="mb-12">

        <p className="text-[#B91C1C] font-bold tracking-[3px] uppercase">
          Recently Added
        </p>

        <h2 className="text-4xl md:text-5xl font-black text-[#111111] mt-2">
          Latest Arrivals
        </h2>

        <div className="w-24 h-1 bg-[#B91C1C] rounded-full mt-4" />

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {latestVehicles.map((car: any) => (

          <Link
            key={car.id}
            to={`/vehicle/${car.id}`}
            className="
              group
              bg-white
              rounded-[30px]
              overflow-hidden
              border
              border-gray-200
              shadow-premium
              hover:shadow-luxury
              hover:-translate-y-2
              transition-all
              duration-500
            "
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">

              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="
                  w-full
                  h-64
                  object-cover
                  group-hover:scale-110
                  transition
                  duration-700
                "
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* NEW ARRIVAL */}
              <span
                className="
                  absolute
                  top-5
                  left-5
                  bg-[#16A34A]
                  text-white
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  font-bold
                  shadow-lg
                "
              >
                NEW ARRIVAL
              </span>

              {/* FAVORITES */}
              <button
                onClick={(e) =>
                  toggleFavorite(e, car.id)
                }
                className="
                  absolute
                  top-5
                  right-5
                  w-11
                  h-11
                  rounded-full
                  bg-white/95
                  backdrop-blur-xl
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  hover:scale-110
                  active:scale-95
                  transition
                "
              >
                <Heart
                  size={18}
                  className={
                    isFavorite(car.id)
                      ? "fill-[#B91C1C] text-[#B91C1C]"
                      : "text-gray-500"
                  }
                />
              </button>

              {/* SOLD BADGE */}
              {car.status === "sold" && (
                <span
                  className="
                    absolute
                    bottom-5
                    left-5
                    bg-black
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-bold
                  "
                >
                  SOLD
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h3 className="font-black text-2xl text-[#111111]">
                {car.make} {car.model}
              </h3>

              <p className="text-gray-500 mt-2">
                {car.location}
              </p>

              <div className="mt-5 flex items-center justify-between">

                <p className="text-[#B91C1C] text-2xl font-black">
                  {car.price}
                </p>

                {car.verified && (
                  <span
                    className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                    "
                  >
                    VERIFIED
                  </span>
                )}
              </div>

              {/* COMPARE */}
              <button
                onClick={(e) => {
                  e.preventDefault();

                  if (isInCompare(car.id)) {
                    removeFromCompare(car.id);
                  } else {
                    addToCompare(car);
                  }

                  forceUpdate({});
                }}
                className={`
                  mt-6
                  w-full
                  py-4
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300
                  ${
                    isInCompare(car.id)
                      ? "bg-[#111111] text-white"
                      : "bg-[#B91C1C] hover:bg-[#7F1D1D] text-white"
                  }
                `}
              >
                {isInCompare(car.id)
                  ? "✓ Added To Compare"
                  : "Compare Vehicle"}
              </button>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}