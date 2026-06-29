export const getRecentlyViewed = () => {
  const data = localStorage.getItem(
    "carconnect-recent"
  );

  return data ? JSON.parse(data) : [];
};

export const addRecentlyViewed = (
  vehicleId: number
) => {
  let items = getRecentlyViewed();

  // remove if already exists (avoid duplicates)
  items = items.filter(
    (id: number) => id !== vehicleId
  );

  // add to front
  items.unshift(vehicleId);

  // keep only last 8
  items = items.slice(0, 8);

  localStorage.setItem(
    "carconnect-recent",
    JSON.stringify(items)
  );
};