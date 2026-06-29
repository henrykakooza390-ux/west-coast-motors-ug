import { getVehicles } from "./vehicleStorage";

export const getTotalVehicles = async () => {
  const data = await getVehicles();
  return data.length;
};

export const getFeaturedVehicles = async () => {
  const data = await getVehicles();
  return data.filter((v: any) => v.featured).length;
};

export const getBestDeals = async () => {
  const data = await getVehicles();
  return data.filter((v: any) => v.bestDeal).length;
};

export const getVerifiedVehicles = async () => {
  const data = await getVehicles();
  return data.filter((v: any) => v.verified).length;
};

export const getTotalFavorites = async () => {
  return 0;
};

export const getTrendingVehicles = async () => {
  const data = await getVehicles();
  return data.slice(0, 5);
};

export const getMostExpensiveVehicles = async () => {
  const data = await getVehicles();

  return [...data].sort(
    (a: any, b: any) =>
      Number(b.price) - Number(a.price)
  );
};

export const getRecentlyAddedVehicles = async () => {
  const data = await getVehicles();
  return data.slice(0, 5);
};

export const getTotalViews = async () => {
  const data = await getVehicles();

  return data.reduce(
    (sum: number, v: any) => sum + Number(v.views || 0),
    0
  );
};