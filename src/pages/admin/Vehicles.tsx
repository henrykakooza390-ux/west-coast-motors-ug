import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVehicles } from "../../utils/vehicleStorage";
import { deleteVehicle, updateVehicle } from "../../utils/vehicleStorage";

type Vehicle = {
  id: string;
  make?: string;
  model?: string;
  price?: string | number;
  image?: string;
  status?: string;
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const data = await getVehicles();

      setVehicles(data as Vehicle[]);
    } catch (error) {
      console.log("Error loading vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleDelete = async (id: string) => {
  try {
    if (!window.confirm("Delete this vehicle?")) return;

    console.log("Deleting:", id);

    await deleteVehicle(id);

    setVehicles((prev) =>
      prev.filter((v) => v.id !== id)
    );

    console.log("Deleted successfully");
  } catch (error) {
    console.error("Delete failed:", error);

    alert("Failed to delete vehicle");
  }
};

  const markSold = async (id: string) => {
    await updateVehicle(id, { status: "sold" });
    loadVehicles();
  };

  const archiveVehicle = async (id: string) => {
    await updateVehicle(id, { status: "archived" });
    loadVehicles();
  };

  const restoreVehicle = async (id: string) => {
    await updateVehicle(id, { status: "approved" });
    loadVehicles();
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading vehicles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Vehicle Management (West Coast Motors UG)
        </h1>

        {vehicles.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow text-center">
            No vehicles found
          </div>
        ) : (
          <div className="space-y-6">

            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white p-5 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6"
              >

                {/* IMAGE SECTION */}
                <div className="w-full md:w-48 flex-shrink-0">
                  <img
                    src={vehicle.image || "/cars/default.jpg"}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="h-40 w-full object-cover rounded-2xl"
                  />
                </div>

                {/* INFO SECTION */}
                <div className="flex-1">

                  <h2 className="text-xl font-bold">
                    {vehicle.make} {vehicle.model}
                  </h2>

                  <p className="text-blue-600 font-bold mt-1">
                    {vehicle.price}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Status: {vehicle.status || "approved"}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-4 flex-wrap">

                    <Link
                      to={`/admin/edit-vehicle/${vehicle.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => markSold(vehicle.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl"
                    >
                      Sold
                    </button>

                    <button
                      onClick={() => archiveVehicle(vehicle.id)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-xl"
                    >
                      Archive
                    </button>

                    <button
                      onClick={() => restoreVehicle(vehicle.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                    >
                      Restore
                    </button>

                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}