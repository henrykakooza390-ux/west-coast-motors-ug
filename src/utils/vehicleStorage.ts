import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import { addActivityLog } from "./activityLog";

/* =========================
COLLECTIONS
========================= */

const vehiclesRef = collection(db, "vehicles");
const pendingRef = collection(db, "pendingVehicles");
const rejectedRef = collection(db, "rejectedVehicles");

/* =========================
HELPER: SAFE ID
========================= */


/* =========================
LIVE VEHICLES
========================= */

export const getVehicles = async () => {
  const q = query(vehiclesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    ...d.data(),
    id: d.id, // MUST COME LAST
  }));
};

export const deleteVehicle = async (id: string) => {
  try {
    const ref = doc(db, "vehicles", id);

    await deleteDoc(ref);

    await addActivityLog("Vehicle Deleted", id);
  } catch (error) {
    console.error("Delete vehicle failed:", error);
    throw error;
  }
};

export const getVehicleById = async (id: string) => {
  try {
    const ref = doc(db, "vehicles", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
  ...snap.data(),
  id: snap.id, // MUST COME LAST
};
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return null;
  }
};

export const saveVehicle = async (vehicle: any) => {
  const docRef = await addDoc(vehiclesRef, {
    ...vehicle,
    status: "approved",
    createdAt: serverTimestamp(),
  });

  await addActivityLog(
    "Vehicle Added",
    `${vehicle.make} ${vehicle.model}`
  );

  return docRef.id;
};

export const updateVehicle = async (id: string, updatedData: any) => {
  await updateDoc(doc(db, "vehicles", id), updatedData);

  await addActivityLog("Vehicle Updated", id);
};

/* =========================
PENDING VEHICLES
========================= */

export const getPendingVehicles = async () => {
  const q = query(pendingRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    ...d.data(),
  id: d.id,
  }));
};

export const savePendingVehicle = async (vehicle: any) => {
  await addDoc(pendingRef, {
    ...vehicle,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  await addActivityLog(
    "Vehicle Submitted",
    `${vehicle.make} ${vehicle.model}`
  );
};

/* =========================
UPDATE PENDING (FIXED)
========================= */

export const updatePendingVehicle = async (id: string, data: any) => {
  try {
    if (!id) throw new Error("Missing vehicle id");

    const ref = doc(db, "pendingVehicles", id);

    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    console.log("Pending updated:", id);

    await addActivityLog("Pending Vehicle Updated", id);
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
};

/* =========================
APPROVE VEHICLE (FIXED)
========================= */

export const approveVehicle = async (id: string) => {
  try {
    if (!id) throw new Error("Missing vehicle id");

    const pendingRefDoc = doc(db, "pendingVehicles", id);
    const snap = await getDoc(pendingRefDoc);

    if (!snap.exists()) {
      throw new Error("Pending vehicle not found");
    }

    const vehicle = snap.data();

    const approvedData = {
      ...vehicle,
      status: "approved",
      approvedAt: serverTimestamp(),
      createdAt: vehicle.createdAt || serverTimestamp(),
    };

    // add to live vehicles
    await addDoc(vehiclesRef, approvedData);

    // remove pending
    await deleteDoc(pendingRefDoc);

    console.log("Vehicle approved:", id);

    await addActivityLog("Vehicle Approved", id);
  } catch (error) {
    console.error("Approve failed:", error);
    throw error;
  }
};

/* =========================
REJECT VEHICLE (FIXED)
========================= */

export const rejectVehicle = async (id: string, reason = "Rejected") => {
  try {
    if (!id) throw new Error("Missing vehicle id");

    const pendingRefDoc = doc(db, "pendingVehicles", id);
    const snap = await getDoc(pendingRefDoc);

    if (!snap.exists()) {
      throw new Error("Pending vehicle not found");
    }

    const vehicle = snap.data();

    const rejectedData = {
      ...vehicle,
      status: "rejected",
      reason,
      rejectedAt: serverTimestamp(),
    };

    await addDoc(rejectedRef, rejectedData);

    await deleteDoc(pendingRefDoc);

    console.log("Vehicle rejected:", id);

    await addActivityLog("Vehicle Rejected", id);
  } catch (error) {
    console.error("Reject failed:", error);
    throw error;
  }
};

/* =========================
REJECTED VEHICLES
========================= */

export const getRejectedVehicles = async () => {
  const q = query(rejectedRef, orderBy("rejectedAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    ...d.data(),
  id: d.id,
  }));
};

export const deleteRejectedVehicle = async (id: string) => {
  await deleteDoc(doc(db, "rejectedVehicles", id));
};

/* =========================
STATUS UPDATES
========================= */

export const markSold = async (id: string) => {
  await updateDoc(doc(db, "vehicles", id), {
    status: "sold",
    soldAt: serverTimestamp(),
  });
};

export const archiveVehicle = async (id: string) => {
  await updateDoc(doc(db, "vehicles", id), {
    status: "archived",
  });
};

export const restoreVehicle = async (id: string) => {
  await updateDoc(doc(db, "vehicles", id), {
    status: "approved",
  });
};