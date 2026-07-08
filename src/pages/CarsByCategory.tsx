import PageHeader from "../components/PageHeader";
import VehicleCard from "../components/VehicleCard";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehicles } from "../utils/vehicleStorage";

export default function CarsByCategory() {
  const { bodyType } = useParams();

  const [filteredCars, setFilteredCars] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const data = await getVehicles();

      const filtered = data.filter(
        (car: any) =>
          car.bodyType?.toLowerCase() ===
          bodyType?.toLowerCase()
      );

      setFilteredCars(filtered);

      setLoading(false);
    };

    load();
  }, [bodyType]);

  if (loading) {
    return (
      <div className="p-8">
        Loading vehicles...
      </div>
    );
  }

  filteredCars.forEach((car) => {
  console.log(
    "BODY:",
    bodyType,
    "ID:",
    car.id,
    "MAKE:",
    car.make,
    "MODEL:",
    car.model
  );
});
  return (
    <>
      <PageHeader
        title={`${bodyType} Vehicles`}
        subtitle="Browse vehicles by category"
      />

      <section className="bg-gradient-to-b from-slate-50 to-white min-h-screen">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              bg-white
              shadow-md
              text-blue-600
              font-semibold
              hover:shadow-xl
              transition
              mb-8
            "
          >
            ← Back Home
          </Link>

          <h1 className="text-3xl font-black">
            {bodyType} Vehicles
          </h1>

          <p className="text-gray-500 mt-3">
            {filteredCars.length} vehicles found
          </p>

          {filteredCars.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl shadow-lg text-center mt-8">
              No Vehicles Found
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mt-8">

              {filteredCars.map((car) => (
                <VehicleCard
                  key={car.id}
                  car={car}
                />
              ))}

            </div>
          )}

        </div>

      </section>
    </>
  );
}