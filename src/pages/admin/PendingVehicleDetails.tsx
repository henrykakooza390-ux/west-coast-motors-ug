import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPendingVehicles,
  approveVehicle,
  rejectVehicle,
} from "../../utils/vehicleStorage";

type Vehicle = {
  id: string;
  make?: string;
  model?: string;
  price?: string;
  image?: string;
  location?: string;
  year?: string;
  mileage?: string;
  fuel?: string;
  transmission?: string;
  dealer?: string;
  phone?: string;
  whatsapp?: string;
  description?: string;
};

export default function PendingVehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // =========================
  // LOAD VEHICLE
  // =========================
  const loadVehicle = async () => {
    try {
      setLoading(true);

      const vehicles = await getPendingVehicles();

      // FIX: ensure Firestore id matches route id
      const found = vehicles.find(
        (v: any) => String(v.id) === String(id)
      );

      setVehicle(found || null);
    } catch (error) {
      console.log("Error loading vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicle();
  }, [id]);

  // =========================
  // APPROVE
  // =========================
  const handleApprove = async () => {
    if (!vehicle || actionLoading) return;

    try {
      setActionLoading(true);

      await approveVehicle(vehicle.id);

      alert("Vehicle approved successfully!");

      navigate("/admin/pending");
    } catch (error) {
      console.log("Approve error:", error);
      alert("Failed to approve vehicle.");
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // REJECT
  // =========================
  const handleReject = async () => {
    if (!vehicle || actionLoading) return;

    try {
      setActionLoading(true);

      await rejectVehicle(vehicle.id);

      alert("Vehicle rejected successfully!");

      navigate("/admin/pending");
    } catch (error) {
      console.log("Reject error:", error);
      alert("Failed to reject vehicle.");
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading pending vehicle...
      </div>
    );
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!vehicle) {
    return (
      <div className="p-8 text-center text-gray-600">
        Vehicle not found.
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        {vehicle.make} {vehicle.model}
      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <img
          src={vehicle.image || "/cars/default.jpg"}
          className="w-full h-[400px] object-cover rounded-2xl"
        />

        <p className="text-blue-600 text-2xl font-bold mt-6">
          {vehicle.price}
        </p>

        <p className="text-gray-500">{vehicle.location}</p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={handleApprove}
            disabled={actionLoading}
            className="bg-green-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {actionLoading ? "Processing..." : "Approve"}
          </button>

          <button
            onClick={handleReject}
            disabled={actionLoading}
            className="bg-red-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {actionLoading ? "Processing..." : "Reject"}
          </button>

        </div>

      </div>
    </div>
  );
}