import { useVehiclesContext } from "../../context/VehiclesContext";

export default function Dashboard() {
  const { vehicles, loading } = useVehiclesContext();

  if (loading) {
    return (
      <div className="p-8">
        Loading dashboard...
      </div>
    );
  }

  const totalVehicles = vehicles.length;

  const featuredVehicles = vehicles.filter(
    (v: any) => v.featured
  ).length;

  const verifiedVehicles = vehicles.filter(
    (v: any) => v.verified
  ).length;

  const soldVehicles = vehicles.filter(
    (v: any) => v.status === "sold"
  ).length;

  const archivedVehicles = vehicles.filter(
    (v: any) => v.status === "archived"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-gray-500 text-base">
              Total Vehicles
            </h3>

            <p className="text-4xl md:text-5xl font-black mt-4">
              {totalVehicles}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-gray-500 text-base">
              Featured Vehicles
            </h3>

            <p className="text-4xl md:text-5xl font-black mt-4 text-blue-600">
              {featuredVehicles}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-gray-500 text-base">
              Verified Vehicles
            </h3>

            <p className="text-4xl md:text-5xl font-black mt-4 text-green-600">
              {verifiedVehicles}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-gray-500 text-base">
              Sold Vehicles
            </h3>

            <p className="text-4xl md:text-5xl font-black mt-4 text-red-600">
              {soldVehicles}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-gray-500 text-base">
              Archived Vehicles
            </h3>

            <p className="text-4xl md:text-5xl font-black mt-4 text-gray-600">
              {archivedVehicles}
            </p>
          </div>

        </div>

        {/* RECENT LISTINGS */}

        <div className="bg-white rounded-3xl shadow-xl p-5 md:p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Recent Listings
          </h2>

          <div className="space-y-5">

            {vehicles
              .slice()
              .reverse()
              .slice(0, 5)
              .map((vehicle: any) => (

                <div
                  key={vehicle.id}
                  className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  border-b
                  pb-5
                  gap-3
                "
                >

                  <div>

                    <h3 className="font-bold text-lg">
                      {vehicle.make} {vehicle.model}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {vehicle.location}
                    </p>

                  </div>

                  <div className="md:text-right">

                    <p className="font-bold text-blue-600 text-lg">
                      {vehicle.price}
                    </p>

                    {vehicle.status === "sold" && (
                      <span className="text-xs text-red-500 font-semibold">
                        SOLD
                      </span>
                    )}

                    {vehicle.status === "archived" && (
                      <span className="text-xs text-gray-500 font-semibold">
                        ARCHIVED
                      </span>
                    )}

                  </div>

                </div>

              ))}

          </div>

        </div>

      </div>

    </div>
  );
}