export const getFavorites = () => {
  const data = localStorage.getItem(
    "carconnect-favorites"
  );

  return data ? JSON.parse(data) : [];
};

export const addToFavorites = (
  vehicleId: string
) => {
  const favorites = getFavorites();

  if (!favorites.includes(vehicleId)) {
    favorites.push(vehicleId);

    localStorage.setItem(
      "carconnect-favorites",
      JSON.stringify(favorites)
    );
  }
};

export const removeFromFavorites = (
  vehicleId: string
) => {
  const favorites = getFavorites().filter(
    (id: string) => id !== vehicleId
  );

  localStorage.setItem(
    "carconnect-favorites",
    JSON.stringify(favorites)
  );
};

export const isFavorite = (
  vehicleId: string
) => {
  return getFavorites().includes(vehicleId);
};