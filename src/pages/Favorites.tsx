import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { getVehicles } from "../utils/vehicleStorage";
import {
  getFavorites,
  removeFromFavorites,
} from "../utils/favorites";

export default function Favorites() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    const allCars = await getVehicles();
    const favoriteIds = getFavorites();

    const favoriteCars = allCars.filter((car: any) =>
      favoriteIds.includes(car.id)
    );

    setCars(favoriteCars);
    setLoading(false);
  };

  useEffect(() => {
    load();

    const handleStorage = () => load();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("favoritesUpdated", handleStorage);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
      window.removeEventListener(
        "favoritesUpdated",
        handleStorage
      );
    };
  }, []);

  const handleRemove = (id: string) => {
    removeFromFavorites(String(id));

    window.dispatchEvent(
      new CustomEvent("favoritesUpdated")
    );

    setCars((prev) =>
      prev.filter((car) => car.id !== id)
    );
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading favorites...
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="My Favorites"
        subtitle="Your saved vehicles in one place."
      />

      <section className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {cars.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 shadow text-center">

              <div className="flex justify-center mb-4">
                <Heart
                  size={50}
                  className="text-gray-300"
                />
              </div>

              <h2 className="text-2xl font-bold">
                No favorites yet
              </h2>

              <p className="text-gray-500 mt-3">
                Save vehicles using the heart
                button.
              </p>

              <Link
                to="/"
                className="
                  inline-block
                  mt-6
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  transition
                "
              >
                Browse Vehicles
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {cars.map((car: any) => (
                <div
                  key={car.id}
                  className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    overflow-hidden
                    hover:shadow-xl
                    transition
                  "
                >
                  <div className="relative">

                    <img
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      className="
                        h-56
                        w-full
                        object-cover
                      "
                    />

                    <button
                      onClick={() =>
                        handleRemove(car.id)
                      }
                      className="
                        absolute
                        top-4
                        right-4
                        bg-white/90
                        backdrop-blur
                        rounded-full
                        p-2
                        shadow-lg
                        hover:scale-110
                        transition
                      "
                    >
                      <Heart
                        size={20}
                        className="fill-red-500 text-red-500"
                      />
                    </button>
                  </div>

                  <div className="p-5">

                    <h3 className="font-bold text-lg">
                      {car.make} {car.model}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {car.location}
                    </p>

                    <p className="text-blue-600 font-bold text-xl mt-3">
                      {car.price}
                    </p>

                    <div className="flex gap-3 mt-5">

                      <Link
                        to={`/vehicle/${car.id}`}
                        className="
                          flex-1
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          py-3
                          rounded-xl
                          text-center
                          font-semibold
                          transition
                        "
                      >
                        View Vehicle
                      </Link>

                      <button
                        onClick={() =>
                          handleRemove(car.id)
                        }
                        className="
                          px-4
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          rounded-xl
                          transition
                        "
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>
    </>
  );
}