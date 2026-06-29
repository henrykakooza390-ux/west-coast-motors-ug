const VIEWS_KEY = "carconnect-views";

/**
 * Get all vehicle views
 */
export const getViews = () => {
  const data = localStorage.getItem(VIEWS_KEY);
  return data ? JSON.parse(data) : {};
};

/**
 * Add +1 view to a vehicle
 */
export const addView = (vehicleId: number) => {
  const views = getViews();

  if (!views[vehicleId]) {
    views[vehicleId] = 1;
  } else {
    views[vehicleId] += 1;
  }

  localStorage.setItem(VIEWS_KEY, JSON.stringify(views));
};

/**
 * Get views for a single vehicle
 */
export const getVehicleViews = (vehicleId: number) => {
  const views = getViews();
  return views[vehicleId] || 0;
};