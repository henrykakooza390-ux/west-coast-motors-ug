import { getVehicles } from "./vehicleStorage";

export const getAllCars = async () => {
  const cars = await getVehicles();

  return cars.filter((car: any) => {
    return car.status !== "archived";
  });
};