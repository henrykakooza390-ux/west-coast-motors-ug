import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Share2,
  Copy,
  Phone,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import siteConfig from "../config/siteConfig";
import { useVehiclesContext } from "../context/VehiclesContext";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import PageHeader from "../components/PageHeader";

export default function VehicleDetails() {
  const { id } = useParams();
  const { vehicles, loading } = useVehiclesContext();

  console.log(
    "DETAIL PAGE PARAM:",
    id
  );

  console.log(
    "ALL VEHICLES:",
    vehicles.map((v: any) => ({
      id: v.id,
      make: v.make,
      model: v.model,
    }))
  );

  const vehicle = vehicles.find(
    (v: any) => String(v.id) === String(id)
  );

  console.log(
    "FOUND VEHICLE:",
    vehicle
  );

  useEffect(() => {
    if (vehicle?.id) {
      addRecentlyViewed(vehicle.id);
    }
  }, [vehicle]);

  const [activeImage, setActiveImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!vehicle) {
  console.error(
    "VEHICLE NOT FOUND",
    {
      routeId: id,
      availableIds: vehicles.map(
        (v: any) => v.id
      ),
    }
  );

  return (
    <div className="p-10 text-center text-gray-500">
      Vehicle not found
    </div>
  );
}

  const images =
    vehicle.images && vehicle.images.length > 0
      ? [vehicle.image, ...vehicle.images]
      : [vehicle.image];

  const shareVehicle = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${vehicle.make} ${vehicle.model}`,
          text: vehicle.price,
          url,
        });
      } else {
        navigator.clipboard.writeText(url);
        alert("Vehicle link copied!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Vehicle link copied!");
  };

  const nextImage = () => {
    setActiveImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setActiveImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">

      {/* LIGHTBOX */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center">

          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X size={34} />
          </button>

          <button
            onClick={previousImage}
            className="absolute left-4 text-white"
          >
            <ChevronLeft size={44} />
          </button>

          <img
            src={images[activeImage]}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 text-white"
          >
            <ChevronRight size={44} />
          </button>

        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <PageHeader
          title={`${vehicle.make} ${vehicle.model}`}
          subtitle="Premium vehicle details"
        />

        {/* HERO IMAGE */}
        <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl border border-gray-200 bg-black">

          <img
            src={images[activeImage]}
            onClick={() => setShowLightbox(true)}
            className="w-full h-full object-contain cursor-pointer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-3 mt-5 overflow-x-auto pb-2">

          {images.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              onClick={() => setActiveImage(index)}
              className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl cursor-pointer border-2 transition ${
                activeImage === index
                  ? ""
                  : "border-transparent"
              }`}
              style={{
                borderColor:
                  activeImage === index
                    ? siteConfig.colors.primary
                    : "transparent",
              }}
            />
          ))}

        </div>

        {/* TITLE */}
        <h1
          className="text-3xl md:text-5xl font-black mt-10"
          style={{
            color: siteConfig.colors.secondary,
          }}
        >
          {vehicle.make} {vehicle.model}
        </h1>

        <p
          className="text-3xl md:text-4xl font-black mt-3"
          style={{
            color: siteConfig.colors.primary,
          }}
        >
          {vehicle.price}
        </p>

        <p className="text-gray-500 mt-2">
          {vehicle.location}
        </p>

        {/* ACTION BUTTONS */}
        <div className="grid sm:grid-cols-2 lg:flex gap-4 mt-10">

          <a
            href={`tel:${vehicle.phone || ""}`}
            className="flex justify-center items-center gap-2 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition"
            style={{
              backgroundColor: siteConfig.colors.primary,
            }}
          >
            <Phone size={18} />
            Call Seller
          </a>

          <a
            href={`https://wa.me/${vehicle.whatsapp || ""}`}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-2 border border-green-500 text-green-600 px-6 py-4 rounded-2xl font-bold hover:bg-green-50 transition"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <button
            onClick={shareVehicle}
            className="flex justify-center items-center gap-2 bg-white border border-gray-200 px-6 py-4 rounded-2xl font-bold transition"
            style={{
              borderColor: "#E5E7EB",
            }}
          >
            <Share2 size={18} />
            Share
          </button>

          <button
            onClick={copyLink}
            className="flex justify-center items-center gap-2 bg-white border border-gray-200 px-6 py-4 rounded-2xl font-bold transition"
            style={{
              borderColor: "#E5E7EB",
            }}
          >
            <Copy size={18} />
            Copy Link
          </button>

        </div>

        {/* SPECS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-12">

          {[
            ["Year", vehicle.year],
            ["Mileage", vehicle.mileage],
            ["Fuel", vehicle.fuel],
            ["Transmission", vehicle.transmission],
            ["Body Type", vehicle.bodyType || "N/A"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white p-5 rounded-3xl shadow-lg border border-gray-100"
            >
              <p className="text-gray-500 text-sm">
                {label}
              </p>

              <h3
                className="font-bold mt-1"
                style={{
                  color: siteConfig.colors.secondary,
                }}
              >
                {value}
              </h3>

            </div>
          ))}

        </div>

        {/* SELLER INFO */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 mt-12">

          <h2
            className="text-2xl font-bold mb-5"
            style={{
              color: siteConfig.colors.secondary,
            }}
          >
            Seller Information
          </h2>

          <div className="space-y-3 text-gray-600">

            <p><strong>Dealer:</strong> {vehicle.dealer || "Not provided"}</p>
            <p><strong>Phone:</strong> {vehicle.phone || "Not provided"}</p>
            <p><strong>WhatsApp:</strong> {vehicle.whatsapp || "Not provided"}</p>
            <p><strong>Location:</strong> {vehicle.location || "Not provided"}</p>

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 mt-10">

          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: siteConfig.colors.secondary,
            }}
          >
            Description
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {vehicle.description}
          </p>

        </div>

      </div>
    </div>
  );
}