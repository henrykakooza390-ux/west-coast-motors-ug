import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { useSearchParams } from "react-router-dom";
import { useVehiclesContext } from "../context/VehiclesContext";
import VehicleCard from "../components/VehicleCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const { vehicles: cars, loading } =
    useVehiclesContext();

  const [, forceUpdate] = useState({});

  const make =
    searchParams.get("make") || "";

  const model =
    searchParams.get("model") || "";

  const location =
    searchParams.get("location") || "";

  const fuel =
    searchParams.get("fuel") || "";

  const transmission =
    searchParams.get("transmission") || "";

  const bodyType =
    searchParams.get("bodyType") || "";

  const year =
    searchParams.get("year") || "";

  if (loading) return null;

  const filteredCars = cars.filter(
    (car: any) => {
      const matchMake =
        !make ||
        car.make
          ?.toLowerCase()
          .includes(make.toLowerCase());

      const matchModel =
        !model ||
        car.model
          ?.toLowerCase()
          .includes(model.toLowerCase());

      const matchLocation =
        !location ||
        car.location
          ?.toLowerCase()
          .includes(location.toLowerCase());

      const matchFuel =
        !fuel ||
        car.fuel
          ?.toLowerCase()
          .includes(fuel.toLowerCase());

      const matchTransmission =
        !transmission ||
        car.transmission
          ?.toLowerCase()
          .includes(
            transmission.toLowerCase()
          );

      const matchBodyType =
        !bodyType ||
        car.bodyType
          ?.toLowerCase()
          .includes(
            bodyType.toLowerCase()
          );

      const matchYear =
        !year ||
        String(car.year).includes(year);

      return (
        matchMake &&
        matchModel &&
        matchLocation &&
        matchFuel &&
        matchTransmission &&
        matchBodyType &&
        matchYear &&
        car.status !== "archived"
      );
    }
  );

  return (
    <>
      <PageHeader
        title="Search Results"
        subtitle="Find the perfect vehicle for your lifestyle."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Search Results
        </h1>

        <p className="text-gray-500 mb-8">
          {filteredCars.length} vehicle
          {filteredCars.length !== 1
            ? "s"
            : ""}
          {" "}found
        </p>

        {filteredCars.length === 0 ? (
          <div
            className="
              bg-white
              rounded-3xl
              p-10
              md:p-12
              text-center
              shadow-lg
            "
          >
            <h2 className="text-2xl font-bold">
              No Vehicles Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing your search
              filters.
            </p>
          </div>
        ) : (
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

            {filteredCars.map(
              (car: any) => (
                <VehicleCard
                  key={car.id}
                  car={car}
                  forceUpdate={() =>
                    forceUpdate({})
                  }
                />
              )
            )}

          </div>
        )}

      </div>
    </>
  );
}