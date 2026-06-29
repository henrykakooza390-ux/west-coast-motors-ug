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

export default function BestDeals() {
  const { vehicles, loading } = useVehiclesContext();
  const [, forceUpdate] = useState({});

  if (loading) return null;

  const deals = vehicles
    .filter(
      (car: any) =>
        car.status !== "archived" &&
        car.bestDeal === true
    )
    .slice(0, 6);

  if (deals.length === 0) return null;

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
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">

      <div className="flex items-center justify-between mb-8 md:mb-10">
        <div>
          <p className="text-blue-600 font-semibold">
            Special Offers
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Best Deals
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {deals.map((car: any) => (

          <Link
            key={car.id}
            to={`/vehicle/${car.id}`}
            className="
              relative
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition
            "
          >

            <div className="relative">

              <img
                src={car.image}
                className="w-full h-56 object-cover"
              />

              <span
                className="
                  absolute
                  top-4
                  left-4
                  bg-red-500
                  text-white
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-bold
                "
              >
                BEST DEAL
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

            <div className="p-5">

              <h3 className="font-bold text-xl">
                {car.make} {car.model}
              </h3>

              <p className="text-gray-500 mt-1">
                {car.location}
              </p>

              <p className="text-blue-600 font-bold text-lg mt-3">
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