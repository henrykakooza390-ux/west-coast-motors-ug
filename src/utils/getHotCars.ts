import { getVehicles } from "./vehicleStorage";

export const getHotCars = async () => {
  const cars = await getVehicles();

  return cars.map((car: any) => ({
    ...car,
    hotScore: Math.random(),
  }));
};