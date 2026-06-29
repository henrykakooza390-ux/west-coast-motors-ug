import { useState, useEffect } from "react";
import { Scale } from "lucide-react";

import {
  addToCompare,
  removeFromCompare,
  isInCompare,
  getComparedVehicles,
} from "../utils/compare";

export default function CompareButton({
  vehicle,
}: {
  vehicle: any;
}) {
  const [selected, setSelected] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const updateState = () => {
      setSelected(isInCompare(vehicle.id));
    };

    updateState();

    window.addEventListener("compareUpdated", updateState);

    return () => {
      window.removeEventListener("compareUpdated", updateState);
    };
  }, [vehicle.id]);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setAnimating(true);
    setTimeout(() => setAnimating(false), 150);

    if (selected) {
      removeFromCompare(vehicle.id);
    } else {
      if (getComparedVehicles().length >= 3) {
        alert("You can compare only 3 vehicles.");
        return;
      }

      addToCompare(vehicle);
    }
  };

  return (
    <button
      onClick={toggleCompare}
      className={`
        absolute
        top-4
        right-16
        z-20
        rounded-full
        p-2
        shadow-lg
        transition-all
        duration-200
        ${
          selected
            ? "bg-blue-600 text-white scale-110"
            : "bg-white text-black"
        }
        ${animating ? "scale-95" : "scale-100"}
      `}
    >
      <Scale
        size={20}
        color={selected ? "white" : "black"}
      />
    </button>
  );
}