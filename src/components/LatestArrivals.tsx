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

      <div className="mb-12">
        <p className="text-blue-600 font-semibold">
          Recently Added
        </p>

        <h2 className="text-3xl md:text-5xl font-black mt-2">
          Latest Arrivals
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {latestVehicles.map((car: any) => (

          <Link
            key={car.id}
            to={`/vehicle/${car.id}`}
            className="
              relative
              bg-white
              rounded-[32px]
              overflow-hidden
              border
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition
            "
          >

            <div className="relative">

              <img
                src={car.image}
                className="
                  w-full
                  h-56
                  object-cover
                "
              />

              <span
                className="
                  absolute
                  top-4
                  left-4
                  bg-green-600
                  text-white
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-bold
                "
              >
                NEW ARRIVAL
              </span>

              <button
                onClick={(e) =>
                  toggleFavorite(e, car.id)
                }
                className="
                  absolute
                  top-4
                  right-4
                  bg-white
                  p-2
                  rounded-full
                  shadow
                  active:scale-95
                  transition
                "
              >
                <Heart
                  size={18}
                  className={
                    isFavorite(car.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500"
                  }
                />
              </button>

            </div>

            <div className="p-6">

              <h3 className="font-bold text-xl">
                {car.make} {car.model}
              </h3>

              <p className="text-gray-500">
                {car.location}
              </p>

              <p className="text-blue-600 text-xl font-black mt-4">
                {car.price}
              </p>

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
                  mt-5
                  w-full
                  py-3
                  rounded-2xl
                  font-bold
                  active:scale-95
                  transition
                  ${
                    isInCompare(car.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }
                `}
              >
                {isInCompare(car.id)
                  ? "✓ Added To Compare"
                  : "Compare"}
              </button>

            </div>

          </Link>
        ))}

      </div>
    </section>
  );
}