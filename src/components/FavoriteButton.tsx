import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../utils/favorites";

export default function FavoriteButton({
  vehicleId,
}: {
  vehicleId: string | number;
}) {
  // force everything to string
  const id = String(vehicleId);

  const [favorite, setFavorite] =
    useState(isFavorite(id));

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  const toggleFavorite = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (favorite) {
        removeFromFavorites(id);
        setFavorite(false);

        console.log(
          "[FAVORITES] removed",
          id
        );
      } else {
        addToFavorites(id);
        setFavorite(true);

        console.log(
          "[FAVORITES] added",
          id
        );
      }

      // notify favorites page
      window.dispatchEvent(
        new CustomEvent(
          "favoritesUpdated"
        )
      );

      console.log(
        "[FAVORITES STORAGE]",
        localStorage.getItem(
          "carconnect-favorites"
        )
      );
    } catch (error) {
      console.error(
        "[FAVORITES ERROR]",
        error
      );
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="
        absolute
        top-4
        right-4
        bg-white
        rounded-full
        p-2
        shadow-lg
        hover:scale-110
        transition
        z-20
      "
    >
      <Heart
        size={22}
        fill={favorite ? "red" : "none"}
        color={favorite ? "red" : "black"}
      />
    </button>
  );
}