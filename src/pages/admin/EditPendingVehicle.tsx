import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPendingVehicles,
  updatePendingVehicle,
  approveVehicle,
  rejectVehicle,
} from "../../utils/vehicleStorage";

export default function EditPendingVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // LOAD VEHICLE
  // =========================
  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setLoading(true);

        const pending = await getPendingVehicles();

        const found = pending.find((v: any) => v.id === id);

        setVehicle(found || null);
      } catch (error) {
        console.log("Load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SAVE ONLY
  // =========================
  const handleSave = async () => {
    try {
      setSaving(true);

      await updatePendingVehicle(String(id), {
        ...vehicle,
        updatedAt: Date.now(),
      });

      alert("Changes saved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // APPROVE (SAFE FLOW)
  // =========================
  const handleApprove = async () => {
    try {
      setSaving(true);

      // 1. ALWAYS save latest edits first
      await updatePendingVehicle(String(id), {
        ...vehicle,
        updatedAt: Date.now(),
      });

      // 2. Then approve (moves to vehicles collection)
      await approveVehicle(String(id));

      alert("Vehicle Approved Successfully");

      navigate("/admin/pending");
    } catch (error) {
      console.log(error);
      alert("Approval failed");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // REJECT
  // =========================
  const handleReject = async () => {
    try {
      setSaving(true);

      const reason = "Rejected by admin";
      await rejectVehicle(String(id), reason);

      alert("Vehicle Rejected");

      navigate("/admin/pending");
    } catch (error) {
      console.log(error);
      alert("Reject failed");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!vehicle) {
    return <div className="p-8">Vehicle not found</div>;
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Review Pending Vehicle
      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        {/* =========================
        BASIC INFO
        ========================= */}
        <div className="grid md:grid-cols-2 gap-6">

          <input
            name="make"
            value={vehicle.make || ""}
            onChange={handleChange}
            placeholder="Make"
            className="border rounded-xl p-4"
          />

          <input
            name="model"
            value={vehicle.model || ""}
            onChange={handleChange}
            placeholder="Model"
            className="border rounded-xl p-4"
          />

          <input
            name="price"
            value={vehicle.price || ""}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded-xl p-4"
          />

          <input
            name="location"
            value={vehicle.location || ""}
            onChange={handleChange}
            placeholder="Location"
            className="border rounded-xl p-4"
          />

          <input
            name="year"
            value={vehicle.year || ""}
            onChange={handleChange}
            placeholder="Year"
            className="border rounded-xl p-4"
          />

          <input
            name="mileage"
            value={vehicle.mileage || ""}
            onChange={handleChange}
            placeholder="Mileage"
            className="border rounded-xl p-4"
          />

          <input
            name="fuel"
            value={vehicle.fuel || ""}
            onChange={handleChange}
            placeholder="Fuel"
            className="border rounded-xl p-4"
          />

          <input
            name="transmission"
            value={vehicle.transmission || ""}
            onChange={handleChange}
            placeholder="Transmission"
            className="border rounded-xl p-4"
          />

        </div>

        {/* =========================
        SELLER INFO (ADDED FIX)
        ========================= */}
        <h2 className="text-2xl font-bold mt-8 mb-4">
          Seller Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            name="dealer"
            value={vehicle.dealer || ""}
            onChange={handleChange}
            placeholder="Dealer Name"
            className="border rounded-xl p-4"
          />

          <input
            name="phone"
            value={vehicle.phone || ""}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border rounded-xl p-4"
          />

          <input
            name="whatsapp"
            value={vehicle.whatsapp || ""}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="border rounded-xl p-4"
          />

        </div>

        {/* =========================
        DESCRIPTION
        ========================= */}
        <textarea
          name="description"
          value={vehicle.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-xl p-4 h-40 mt-6"
        />

        {/* =========================
        FLAGS
        ========================= */}
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
            Featured
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
            Verified
          </label>

        </div>

        {/* =========================
        ACTIONS
        ========================= */}
        <div className="flex gap-4 mt-10">

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Save Changes
          </button>

          <button
            onClick={handleApprove}
            disabled={saving}
            className="bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Approve Vehicle
          </button>

          <button
            onClick={handleReject}
            disabled={saving}
            className="bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Reject Vehicle
          </button>

        </div>

      </div>
    </div>
  );
}