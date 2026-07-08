import { useState } from "react";
import { getRecentlyViewed } from "../utils/recentlyViewed";
import { useVehiclesContext } from "../context/VehiclesContext";
import VehicleCard from "./VehicleCard";

export default function RecentlyViewed() {
  const { vehicles: allVehicles, loading } = useVehiclesContext();
  const [, forceUpdate] = useState({});

  const recentIds = getRecentlyViewed();

  if (loading) return null;

  const vehicles = allVehicles
    .filter((v: any) => recentIds.includes(v.id))
    .sort(
      (a: any, b: any) =>
        recentIds.indexOf(a.id) -
        recentIds.indexOf(b.id)
    );

  if (vehicles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">

      {/* HEADER */}
      <div className="mb-8 md:mb-10">

        <p className="text-brand-red font-semibold text-sm uppercase tracking-wide">
          Your History
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-brand-black">
          Recently Viewed
        </h2>

      </div>

      {/* GRID */}
      <div
  className="
    grid
    grid-cols-2
    min-[320px]:grid-cols-2
    max-[379px]:grid-cols-1
    lg:grid-cols-3
    gap-4
    md:gap-8
  "
>

        {vehicles.map((car: any) => (
          <VehicleCard
            key={car.id}
            car={car}
            forceUpdate={() => forceUpdate({})}
          />
        ))}

      </div>

    </section>
  );
}