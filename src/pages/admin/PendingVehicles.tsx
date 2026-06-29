import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPendingVehicles,
  approveVehicle,
  rejectVehicle,
} from "../../utils/vehicleStorage";

export default function PendingVehicles() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const data = await getPendingVehicles();

      console.log("Pending vehicles:", data);

      setVehicles(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleApprove = async (vehicle: any) => {
  try {
    await approveVehicle(vehicle.id);
    await loadVehicles();
  } catch (error) {
    console.log(error);
    alert("Failed to approve vehicle");
  }
};

  const handleReject = async (vehicle: any) => {
  try {
    const reason = "Rejected by admin"; // ❌ REMOVE prompt

    await rejectVehicle(vehicle.id, reason);
    await loadVehicles();
  } catch (error) {
    console.log(error);
    alert("Failed to reject vehicle");
  }
};

  if (loading) {
    return (
      <div className="p-8">
        Loading pending vehicles...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Pending Vehicle Submissions
      </h1>

      {vehicles.length === 0 && (
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          No pending vehicles found
        </div>
      )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-xl
            "
          >

            {/* IMAGE */}
            <img
              src={vehicle.image || "/cars/default.jpg"}
              alt=""
              className="
                w-full
                h-60
                object-cover
              "
            />

            {/* INFO */}
            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {vehicle.make} {vehicle.model}
              </h2>

              <p className="text-blue-600 text-xl font-bold mt-2">
                {vehicle.price}
              </p>

              <p className="text-gray-500 mt-2">
                {vehicle.location}
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Year:</strong>{" "}
                  {vehicle.year || "N/A"}
                </p>

                <p>
                  <strong>Mileage:</strong>{" "}
                  {vehicle.mileage || "N/A"}
                </p>

                <p>
                  <strong>Fuel:</strong>{" "}
                  {vehicle.fuel || "N/A"}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-3 gap-3 mt-8">

                <button
                  onClick={() =>
                    navigate(
                      `/admin/edit-pending/${vehicle.id}`
                    )
                  }
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleApprove(vehicle)
                  }
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    transition
                  "
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleReject(vehicle)
                  }
                  className="
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    transition
                  "
                >
                  Reject
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}