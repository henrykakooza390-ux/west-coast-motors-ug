import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase";

type Vehicle = any;

type VehiclesContextType = {
  vehicles: Vehicle[];
  loading: boolean;
  refreshVehicles: () => Promise<void>;
};

const VehiclesContext =
  createContext<VehiclesContextType | null>(null);

export function VehiclesProvider({
  children,
}: {
  children: any;
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // kept for backwards compatibility
  const refreshVehicles = async () => {
    // realtime listener handles updates automatically
    return Promise.resolve();
  };

  useEffect(() => {
    setLoading(true);

    const q = query(
      collection(db, "vehicles"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
  ...doc.data(),
  id: doc.id,
}));

        setVehicles(data);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Realtime vehicle listener error:",
          error
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        loading,
        refreshVehicles,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}

export function useVehiclesContext() {
  const context = useContext(VehiclesContext);

  if (!context) {
    throw new Error(
      "useVehiclesContext must be used inside VehiclesProvider"
    );
  }

  return context;
}