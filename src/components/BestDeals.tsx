import { useState } from "react";
import { useVehiclesContext } from "../context/VehiclesContext";
import VehicleCard from "./VehicleCard";

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

  
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">

      {/* HEADER */}
      <div className="mb-12">

        <p className="text-[#B91C1C] font-bold tracking-[3px] uppercase">
          Exclusive Offers
        </p>

        <h2 className="text-4xl md:text-5xl font-black text-[#111111] mt-2">
          Best Deals
        </h2>

        <div className="w-24 h-1 bg-[#B91C1C] rounded-full mt-4" />

      </div>

      {/* GRID */}
      <div
  className="
    grid
    grid-cols-2
    min-[320px]:grid-cols-2
    max-[379px]:grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-4
    md:gap-8
  "
>

{deals.map((car: any) => (
  <VehicleCard
    key={car.id}
    car={{
      ...car,
      featured: true,
    }}
    forceUpdate={() => forceUpdate({})}
  />
))}

      </div>

    </section>
  );
}