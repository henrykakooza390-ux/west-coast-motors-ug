export const getComparedVehicles = () => {
  const data = localStorage.getItem(
    "carconnect-compare"
  );

  return data ? JSON.parse(data) : [];
};

export const isInCompare = (
  id: string
) => {
  const cars = getComparedVehicles();

  return cars.some(
    (car: any) =>
      String(car.id) === String(id)
  );
};

export const addToCompare = (
  vehicle: any
) => {
  let cars = getComparedVehicles();

  if (
    cars.some(
      (car: any) =>
        String(car.id) ===
        String(vehicle.id)
    )
  ) {
    return;
  }

  if (cars.length >= 3) {
    alert(
      "You can compare up to 3 vehicles."
    );
    return;
  }

  cars.push(vehicle);

  localStorage.setItem(
    "carconnect-compare",
    JSON.stringify(cars)
  );

  window.dispatchEvent(
    new Event("compareUpdated")
  );
};

export const removeFromCompare = (
  id: string
) => {
  const cars =
    getComparedVehicles().filter(
      (car: any) =>
        String(car.id) !==
        String(id)
    );

  localStorage.setItem(
    "carconnect-compare",
    JSON.stringify(cars)
  );

  window.dispatchEvent(
    new Event("compareUpdated")
  );
};

export const clearCompare = () => {
  localStorage.removeItem(
    "carconnect-compare"
  );

  window.dispatchEvent(
    new Event("compareUpdated")
  );
};