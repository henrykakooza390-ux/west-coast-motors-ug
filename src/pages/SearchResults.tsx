import PageHeader from "../components/PageHeader";
import { useSearchParams, Link } from "react-router-dom";
import { useVehiclesContext } from "../context/VehiclesContext";
import { addToCompare } from "../utils/compare";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const { vehicles: cars, loading } = useVehiclesContext();

  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const location = searchParams.get("location") || "";
  const fuel = searchParams.get("fuel") || "";
  const transmission = searchParams.get("transmission") || "";
  const bodyType = searchParams.get("bodyType") || "";
  const year = searchParams.get("year") || "";

  if (loading) return null;

  const filteredCars = cars.filter((car: any) => {
    const matchMake =
      !make || car.make?.toLowerCase().includes(make.toLowerCase());

    const matchModel =
      !model || car.model?.toLowerCase().includes(model.toLowerCase());

    const matchLocation =
      !location ||
      car.location?.toLowerCase().includes(location.toLowerCase());

    const matchFuel =
      !fuel || car.fuel?.toLowerCase().includes(fuel.toLowerCase());

    const matchTransmission =
      !transmission ||
      car.transmission?.toLowerCase().includes(
        transmission.toLowerCase()
      );

    const matchBodyType =
      !bodyType ||
      car.bodyType?.toLowerCase().includes(
        bodyType.toLowerCase()
      );

    const matchYear =
      !year || String(car.year).includes(year);

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
  });

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
          {filteredCars.length !== 1 ? "s" : ""}
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
              Try changing your search filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredCars.map((car: any) => (
              <Link
                key={car.id}
                to={`/vehicle/${car.id}`}
                className="
                bg-white/70
                backdrop-blur-md
                border
                border-white/20
                rounded-3xl
                shadow-lg
                overflow-hidden
                hover:shadow-2xl
                transition
                duration-300
                flex
                flex-col
              "
              >

                <img
                  src={car.image}
                  className="
                  h-52
                  sm:h-56
                  w-full
                  object-cover
                "
                />

                <div className="p-5 flex flex-col flex-1">

                  <h3 className="font-bold text-lg md:text-xl">
                    {car.make} {car.model}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {car.location}
                  </p>

                  <div className="flex gap-2 mt-3 flex-wrap">

                    {car.bodyType && (
                      <span
                        className="
                        bg-blue-100
                        text-blue-700
                        text-xs
                        px-3
                        py-1
                        rounded-full
                      "
                      >
                        {car.bodyType}
                      </span>
                    )}

                    {car.fuel && (
                      <span
                        className="
                        bg-green-100
                        text-green-700
                        text-xs
                        px-3
                        py-1
                        rounded-full
                      "
                      >
                        {car.fuel}
                      </span>
                    )}

                  </div>

                  <p
                    className="
                    text-blue-600
                    font-bold
                    text-lg
                    mt-4
                  "
                  >
                    {car.price}
                  </p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCompare(car);
                    }}
                    className="
                    mt-auto
                    mt-5
                    w-full
                    bg-gray-200
                    hover:bg-gray-300
                    py-3
                    rounded-2xl
                    font-semibold
                    transition
                  "
                  >
                    Compare
                  </button>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>
    </>
  );
}