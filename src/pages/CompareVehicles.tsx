import PageHeader from "../components/PageHeader";
import {
  getComparedVehicles,
  removeFromCompare,
  clearCompare,
} from "../utils/compare";
import { Link } from "react-router-dom";

export default function Compare() {
  const cars = getComparedVehicles();

  if (cars.length === 0) {
    return (
      <>
        <PageHeader
          title="Compare Vehicles"
          subtitle="Compare specifications and prices side by side."
        />

        <section className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20">

            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-16 text-center">

              <h2 className="text-2xl sm:text-3xl font-black text-[#0A1E4D]">
                No Vehicles Selected
              </h2>

              <p className="text-gray-500 mt-4 mb-8">
                Add vehicles from the Compare buttons to see them here.
              </p>

              <Link
                to="/"
                className="
                  inline-block
                  px-8
                  py-4
                  rounded-2xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-bold
                  transition
                "
              >
                Browse Cars
              </Link>

            </div>

          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Compare Vehicles"
        subtitle="Compare specifications and prices side by side."
      />

      <section className="bg-gradient-to-b from-slate-50 to-white min-h-screen">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

          {/* Top Controls */}

          <div className="flex flex-col md:flex-row gap-6 md:justify-between md:items-center mb-10">

            <div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0A1E4D]">
                Comparison
              </h2>

              <p className="text-gray-500 mt-2">
                Compare up to 3 vehicles.
              </p>

            </div>

            <button
              onClick={() => {
                clearCompare();
                window.location.reload();
              }}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                py-3
                rounded-2xl
                font-bold
                transition
                w-full
                md:w-auto
              "
            >
              Clear All
            </button>

          </div>

          {/* Cards */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >

            {cars.map((car: any) => (

              <div
                key={car.id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-xl
                  overflow-hidden
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >

                <img
                  src={car.image}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">

                  <h2 className="font-black text-2xl">
                    {car.make} {car.model}
                  </h2>

                  <p className="text-blue-600 font-black text-2xl mt-3">
                    {car.price}
                  </p>

                  <div className="mt-6 space-y-4">

                    <div className="flex justify-between border-b pb-2 gap-4">
                      <span className="font-semibold text-gray-500">
                        Year
                      </span>

                      <span className="text-right">
                        {car.year || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2 gap-4">
                      <span className="font-semibold text-gray-500">
                        Body Type
                      </span>

                      <span className="text-right">
                        {car.bodyType || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2 gap-4">
                      <span className="font-semibold text-gray-500">
                        Fuel
                      </span>

                      <span className="text-right">
                        {car.fuel || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2 gap-4">
                      <span className="font-semibold text-gray-500">
                        Transmission
                      </span>

                      <span className="text-right">
                        {car.transmission || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2 gap-4">
                      <span className="font-semibold text-gray-500">
                        Mileage
                      </span>

                      <span className="text-right">
                        {car.mileage || "N/A"}
                      </span>
                    </div>

                  </div>

                  <button
                    onClick={() => {
                      removeFromCompare(car.id);
                      window.location.reload();
                    }}
                    className="
                      mt-8
                      w-full
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      py-3
                      rounded-2xl
                      font-bold
                      transition
                    "
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </>
  );
}