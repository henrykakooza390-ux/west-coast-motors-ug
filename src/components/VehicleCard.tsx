import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
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

interface Props {
  car: any;
  forceUpdate?: () => void;
}

export default function VehicleCard({
  car,
  forceUpdate,
}: Props) {
  const refresh = () => {
    if (forceUpdate) forceUpdate();
  };

  const toggleFavorite = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (isFavorite(car.id)) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car.id);
    }

    window.dispatchEvent(
      new CustomEvent("favoritesUpdated")
    );

    refresh();
  };

  const toggleCompare = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (isInCompare(car.id)) {
      removeFromCompare(car.id);
    } else {
      addToCompare(car);
    }

    refresh();
  };

  return (
    <Link
  to={`/vehicle/${car.id}`}
  onClick={() => {
    console.log(
      "CLICKED",
      car.make,
      car.model,
      car.id
    );
  }}
      className="
        group
        bg-white/90
        backdrop-blur-xl
        rounded-[30px]
        overflow-hidden
        border
        border-gray-100
        shadow-[0_20px_50px_rgba(0,0,0,.08)]
        hover:shadow-[0_30px_70px_rgba(0,0,0,.18)]
        hover:-translate-y-3
        transition-all
        duration-500
      "
    >
      <div className="relative overflow-hidden">

        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="
            h-64
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(185,28,28,.25),transparent_35%)]
          "
        />

        <button
          onClick={toggleFavorite}
          className="
            absolute
            top-4
            right-4
            bg-white/90
            backdrop-blur-xl
            border
            border-white/40
            p-3
            rounded-full
            shadow-lg
            hover:scale-110
            active:scale-95
            transition
            z-20
          "
        >
          <Heart
            size={18}
            className={
              isFavorite(car.id)
                ? "fill-red-600 text-red-600"
                : "text-gray-600"
            }
          />
        </button>

        {car.featured && (
          <span
            className="
              absolute
              top-4
              left-4
              bg-gradient-to-r
              from-[#111111]
              to-[#B91C1C]
              text-white
              px-4
              py-2
              rounded-full
              text-xs
              font-bold
              shadow-lg
            "
          >
            FEATURED
          </span>
        )}

        {car.verified && (
          <span
            className="
              absolute
              bottom-4
              left-4
              bg-green-600
              text-white
              px-4
              py-2
              rounded-full
              text-xs
              font-bold
              shadow-lg
            "
          >
            VERIFIED
          </span>
        )}
      </div>

      <div className="p-6">

        <h3 className="font-black text-2xl text-[#111111]">
          {car.make} {car.model}
        </h3>

        <p className="text-gray-500 mt-2">
          {car.location}
        </p>

        <div className="mt-5">

          <p className="text-[#B91C1C] text-2xl font-black">
            {car.price}
          </p>

          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
            Luxury Collection
          </p>

        </div>

        <button
          onClick={toggleCompare}
          className={`
            mt-6
            w-full
            py-4
            rounded-2xl
            font-bold
            transition-all
            duration-300
            active:scale-95
            ${
              isInCompare(car.id)
                ? "bg-gradient-to-r from-[#111111] to-[#B91C1C] text-white shadow-lg"
                : "bg-gray-100 hover:bg-gray-200 text-[#111111]"
            }
          `}
        >
          {isInCompare(car.id)
            ? "✓ Added To Compare"
            : "Compare"}
        </button>

      </div>
    </Link>
  );
}