export const getFavorites = () => {
  const data = localStorage.getItem(
    "carconnect-favorites"
  );

  return data ? JSON.parse(data) : [];
};

export const addToFavorites = (
  vehicleId: string | number
) => {
  const id = String(vehicleId);

  const favorites = getFavorites();

  if (!favorites.includes(id)) {
    favorites.push(id);

    localStorage.setItem(
      "carconnect-favorites",
      JSON.stringify(favorites)
    );
  }
};

export const removeFromFavorites = (
  vehicleId: string | number
) => {
  const id = String(vehicleId);

  const favorites = getFavorites().filter(
    (fav: string) => fav !== id
  );

  localStorage.setItem(
    "carconnect-favorites",
    JSON.stringify(favorites)
  );
};

export const isFavorite = (
  vehicleId: string | number
) => {
  return getFavorites().includes(
    String(vehicleId)
  );
};