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

import { useVehiclesContext } from "../context/VehiclesContext";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import PageHeader from "../components/PageHeader";

export default function VehicleDetails() {
  const { id } = useParams();

  const { vehicles, loading } = useVehiclesContext();

  const vehicle = vehicles.find(
    (v: any) => String(v.id) === String(id)
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
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="p-10 text-center">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

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
            className="absolute left-2 md:left-6 text-white"
          >
            <ChevronLeft size={40} />
          </button>

          <img
            src={images[activeImage]}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-2 md:right-6 text-white"
          >
            <ChevronRight size={40} />
          </button>

        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        <PageHeader
          title={`${vehicle.make} ${vehicle.model}`}
          subtitle="Vehicle details and seller information"
        />

        {/* FEATURED IMAGE */}
        <div className="
            relative
            w-full
            aspect-[16/9]
            bg-black
            rounded-[24px]
            md:rounded-[32px]
            overflow-hidden
            shadow-2xl
            border border-white/20
          "
        >
          <img
            src={images[activeImage]}
            onClick={() => setShowLightbox(true)}
            className="w-full h-full object-contain bg-black cursor-pointer"
          />
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

          {images.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              onClick={() => setActiveImage(index)}
              className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl cursor-pointer border-2 flex-shrink-0 ${
                activeImage === index
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
            />
          ))}

        </div>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-black mt-8">
          {vehicle.make} {vehicle.model}
        </h1>

        <p className="text-blue-600 text-2xl md:text-3xl font-black mt-3">
          {vehicle.price}
        </p>

        <p className="text-gray-500 mt-2">
          {vehicle.location}
        </p>

        {/* ACTION BUTTONS */}
        <div className="grid sm:grid-cols-2 lg:flex gap-4 mt-8">

          <a
            href={`tel:${vehicle.phone || ""}`}
            className="flex justify-center items-center gap-2 bg-[#2563EB] hover:bg-[#0A1E4D] text-white px-6 py-4 rounded-2xl font-bold transition"
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
            className="flex justify-center items-center gap-2 border px-6 py-4 rounded-2xl"
          >
            <Share2 size={18} />
            Share
          </button>

          <button
            onClick={copyLink}
            className="flex justify-center items-center gap-2 border px-6 py-4 rounded-2xl"
          >
            <Copy size={18} />
            Copy Link
          </button>

        </div>

        {/* SPECS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10">

          {[
            ["Year", vehicle.year],
            ["Mileage", vehicle.mileage],
            ["Fuel", vehicle.fuel],
            ["Transmission", vehicle.transmission],
            ["Body Type", vehicle.bodyType || "N/A"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white p-5 rounded-3xl shadow-lg"
            >
              <p className="text-gray-500 text-sm">
                {label}
              </p>

              <h3 className="font-bold mt-1">
                {value}
              </h3>

            </div>
          ))}

        </div>

        {/* SELLER INFO */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Seller Information
          </h2>

          <div className="space-y-3">

            <p><strong>Dealer:</strong> {vehicle.dealer || "Not provided"}</p>
            <p><strong>Phone:</strong> {vehicle.phone || "Not provided"}</p>
            <p><strong>WhatsApp:</strong> {vehicle.whatsapp || "Not provided"}</p>
            <p><strong>Location:</strong> {vehicle.location || "Not provided"}</p>

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow mt-10">

          <h2 className="text-2xl font-bold mb-4">
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