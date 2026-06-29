import { Link } from "react-router-dom";
import { getRecentlyViewed } from "../utils/recentlyViewed";
import { useVehiclesContext } from "../context/VehiclesContext";

export default function RecentlyViewed() {
  const { vehicles: allVehicles, loading } = useVehiclesContext();

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

        <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
          Your History
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Recently Viewed
        </h2>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

        {vehicles.map((car: any) => (

          <Link
            key={car.id}
            to={`/vehicle/${car.id}`}
            className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >

            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="
                w-full
                h-52
                sm:h-56
                object-cover
              "
            />

            <div className="p-5">

              <h3 className="font-bold text-lg md:text-xl">
                {car.make} {car.model}
              </h3>

              <p className="text-gray-500 mt-1 text-sm md:text-base">
                {car.location}
              </p>

              <p className="text-blue-600 font-bold mt-3 text-lg">
                {car.price}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}