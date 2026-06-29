import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVehicleById,
  updateVehicle,
} from "../../utils/vehicleStorage";

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadVehicle = async () => {
    try {
      if (!id) {
        setLoading(false);
        return;
      }

      console.log("Loading vehicle:", id);

      const data = await getVehicleById(id);

      console.log("Loaded:", data);

      setVehicle(data);
    } catch (error) {
      console.error(error);
      setVehicle(null);
    } finally {
      setLoading(false);
    }
  };

  loadVehicle();
}, [id]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!id) return;

    await updateVehicle(id, vehicle);

    alert("Vehicle updated successfully");

    navigate("/admin/vehicles");
  };

  if (loading) {
  return <div className="p-8">Loading...</div>;
}

if (!vehicle) {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">
        Vehicle not found
      </h2>

      <button
        onClick={() => navigate("/admin/vehicles")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Back
      </button>
    </div>
  );
}

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Edit Vehicle
      </h1>

      <div className="bg-white p-6 rounded-xl space-y-4">

        <input
          name="make"
          value={vehicle.make || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Make"
        />

        <input
          name="model"
          value={vehicle.model || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Model"
        />

        <input
          name="price"
          value={vehicle.price || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Price"
        />

        <textarea
          name="description"
          value={vehicle.description || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Description"
        />

        <div className="flex gap-10 mt-6">

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={vehicle.featured || false}
      onChange={() =>
        setVehicle({
          ...vehicle,
          featured: !vehicle.featured,
        })
      }
    />
    Featured Vehicle
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={vehicle.bestDeal || false}
      onChange={() =>
        setVehicle({
          ...vehicle,
          bestDeal: !vehicle.bestDeal,
        })
      }
    />
    Best Deal
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={vehicle.verified || false}
      onChange={() =>
        setVehicle({
          ...vehicle,
          verified: !vehicle.verified,
        })
      }
    />
    Verified Vehicle
  </label>

</div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}