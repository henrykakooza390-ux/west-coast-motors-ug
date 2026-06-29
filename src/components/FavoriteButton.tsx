import { useState } from "react";
import { Heart } from "lucide-react";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../utils/favorites";

export default function FavoriteButton({
  vehicleId,
}: {
  vehicleId: number;
}) {
  const [favorite, setFavorite] = useState(
    isFavorite(vehicleId)
  );

  const toggleFavorite = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFromFavorites(vehicleId);
      setFavorite(false);
    } else {
      addToFavorites(vehicleId);
      setFavorite(true);
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