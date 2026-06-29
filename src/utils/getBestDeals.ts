import { getVehicles } from "./vehicleStorage";

export const getBestDeals = async () => {
  const cars = await getVehicles();

  return cars.filter((car: any) => {
    return (
      car.bestDeal === true &&
      car.status !== "archived" &&
      car.status !== "sold"
    );
  });
};