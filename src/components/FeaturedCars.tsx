import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
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

export default function FeaturedCars() {
  const { vehicles, loading } = useVehiclesContext();
  const [, forceUpdate] = useState({});

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading vehicles...
      </div>
    );
  }

  const cars = vehicles.filter(
    (car) =>
      car.status !== "archived" &&
      car.featured === true
  );

  if (cars.length === 0) {
    return (
      <div className="text-center py-20">
        No featured vehicles available.
      </div>
    );
  }

  const toggleFavorite = (
    e: React.MouseEvent,
    carId: string
  ) => {
    e.preventDefault();

    if (isFavorite(carId)) {
      removeFromFavorites(carId);
    } else {
      addToFavorites(carId);
    }

    window.dispatchEvent(
      new CustomEvent("favoritesUpdated")
    );

    forceUpdate({});
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      <h2 className="text-3xl font-bold mb-8">
        Featured Cars
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {cars.map((car) => (

          <Link
            key={car.id}
            to={`/vehicle/${car.id}`}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              overflow-hidden
              hover:shadow-2xl
              transition
            "
          >

            <div className="relative">

              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="h-56 w-full object-cover"
              />

              {/* FAVORITE */}
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
                  hover:scale-110
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

              {/* VERIFIED */}
              {car.verified && (
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
                  VERIFIED
                </span>
              )}
            </div>

            <div className="p-4">

              <h3 className="font-bold text-lg">
                {car.make} {car.model}
              </h3>

              <p className="text-blue-600 font-bold mt-2">
                {car.price}
              </p>

              <p className="text-gray-500 mt-1">
                {car.location}
              </p>

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
                  mt-4
                  w-full
                  py-3
                  rounded-xl
                  font-semibold
                  active:scale-95
                  transition
                  ${
                    isInCompare(car.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
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