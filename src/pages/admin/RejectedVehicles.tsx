import { useEffect, useState } from "react";
import {
  getRejectedVehicles,
  deleteRejectedVehicle,
} from "../../utils/vehicleStorage";

export default function RejectedVehicles() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getRejectedVehicles();

      setVehicles(data);
      setLoading(false);
    };

    load();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteRejectedVehicle(id);

    setVehicles((prev) =>
      prev.filter((v) => v.id !== id)
    );
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Rejected Vehicles
      </h1>

      {vehicles.length === 0 ? (
        <p>No rejected vehicles</p>
      ) : (
        vehicles.map((v) => (
          <div key={v.id} className="bg-white p-4 mb-4 rounded-xl">

            <h2 className="font-bold">
              {v.make} {v.model}
            </h2>

            <p>{v.price}</p>

            <button
              onClick={() => handleDelete(v.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-xl mt-2"
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}