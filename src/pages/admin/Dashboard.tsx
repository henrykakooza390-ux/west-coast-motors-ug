import { useVehiclesContext } from "../../context/VehiclesContext";

import {
  MapPin,
  MoreVertical,
  Bell,
} from "lucide-react";

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
    <div
  className="
    min-h-screen
    bg-gray-100
    px-4
    md:px-8
    pt-5
    pb-8
  "
>

      <div className="max-w-7xl mx-auto">

       <div className="flex items-start justify-between mb-6">

  <div>

    <p className="text-gray-500 text-sm">
      Hello there!, Administrator 👋
    </p>

    <h1 className="text-3xl font-black mt-1">
      Dashboard
    </h1>

  </div>

  <button
    className="
      h-12
      w-12
      rounded-2xl
      bg-white
      shadow-lg
      flex
      items-center
      justify-center
      relative
    "
  >
    <Bell size={20} />

    <span
      className="
        absolute
        top-2
        right-2
        h-2
        w-2
        rounded-full
        bg-red-500
      "
    />
  </button>

</div>

        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

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

        <div
  className="
    bg-white
    rounded-3xl
    shadow-lg
    p-4
    md:p-8
    mt-8
  "
>

          <div className="flex items-center justify-between mb-5">

  <h2 className="text-xl font-bold">
    Recent Listings
  </h2>

  <button
    className="
      text-sm
      font-semibold
      text-blue-600
      hover:text-brand-red
      transition-colors
    "
  >
    View all
  </button>

</div>

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
    items-center
    justify-between
    py-4
    border-b
    border-gray-100
    last:border-0
  "
>

  <div className="flex-1 min-w-0">

    <h3 className="font-semibold text-gray-900 truncate">
      {vehicle.make} {vehicle.model}
    </h3>

    <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">

      <MapPin size={14} />

      <span>{vehicle.location}</span>

    </div>

    <div className="mt-2">

      <span
        className={`
          inline-flex
          items-center
          rounded-full
          px-2.5
          py-1
          text-xs
          font-semibold

          ${
            vehicle.status === "sold"
              ? "bg-red-100 text-red-700"
              : vehicle.status === "archived"
              ? "bg-gray-100 text-gray-700"
              : vehicle.verified
              ? "bg-green-100 text-green-700"
              : vehicle.featured
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }
        `}
      >
        {vehicle.status === "sold"
          ? "Sold"
          : vehicle.status === "archived"
          ? "Archived"
          : vehicle.verified
          ? "Verified"
          : vehicle.featured
          ? "Featured"
          : "Pending"}
      </span>

    </div>

  </div>

  <div className="flex items-center gap-4 ml-4">

    <div className="text-right">

      <p className="font-bold text-blue-600 whitespace-nowrap">
        {vehicle.price}
      </p>

    </div>

    <button
      className="
        h-9
        w-9
        rounded-xl
        hover:bg-gray-100
        transition-colors
        flex
        items-center
        justify-center
      "
    >
      <MoreVertical size={18} />
    </button>

  </div>

</div>

              ))}

          </div>

        </div>

      </div>

    </div>
  );
}