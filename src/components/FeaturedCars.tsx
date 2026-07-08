import { useState } from "react";
import { useVehiclesContext } from "../context/VehiclesContext";
import VehicleCard from "./VehicleCard";

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

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-24">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}

        <div className="mb-14">

          <p className="text-[#B91C1C] font-bold tracking-[0.3em] uppercase">
            Premium Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-[#111111] mt-3">
            Featured Vehicles
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl">
            Explore our hand-selected luxury and performance vehicles from
            West Coast Motors UG.
          </p>

        </div>

        {/* GRID */}

        <div
  className="
    grid
    grid-cols-2
    min-[320px]:grid-cols-2
    max-[379px]:grid-cols-1
    md:grid-cols-3
    gap-4
    md:gap-8
  "
>

          {cars.map((car) => (
  <VehicleCard
    key={car.id}
    car={car}
    forceUpdate={() => forceUpdate({})}
  />
))}

        </div>

      </div>

    </section>
  );
}