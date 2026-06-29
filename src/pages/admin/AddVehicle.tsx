import { useState } from "react";
import { saveVehicle } from "../../utils/vehicleStorage";

/* =========================
IMAGE COMPRESSION HELPER
========================= */
const compressImage = (file: File, quality = 0.7, maxWidth = 800): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(img.src);
          return;
        }

        const scale = maxWidth / img.width;

        canvas.width = img.width > maxWidth ? maxWidth : img.width;
        canvas.height = img.width > maxWidth ? img.height * scale : img.height;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressed = canvas.toDataURL("image/jpeg", quality);

        resolve(compressed);
      };
    };
  });
};

export default function AddVehicle() {
  const [featured, setFeatured] = useState(false);
  const [verified, setVerified] = useState(true);
  const [bestDeal, setBestDeal] = useState(false);

  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    location: "",
    bodyType: "",
    mileage: "",
    fuel: "",
    transmission: "",
    engine: "",
    dealer: "",
    phone: "",
    whatsapp: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const compressed = await compressImage(file, 0.7, 800);
    setCoverImage(compressed);
  };

  const handleGalleryImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const compressed = await Promise.all(
      files.map((file) => compressImage(file, 0.7, 800))
    );

    setGalleryImages(compressed);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const vehicle = {
        id: Date.now(),

        ...formData,

        featured,
        verified,
        bestDeal,

        status: "approved",

        image: coverImage || "/cars/default-car.jpg",

        images:
          galleryImages.length > 0
            ? galleryImages
            : [coverImage || "/cars/default-car.jpg"],
      };

      console.log("🚀 Saving vehicle:", vehicle);

      const result = await saveVehicle(vehicle);

      console.log("✅ SAVE SUCCESS:", result);

      alert("Vehicle saved successfully!");

      setFormData({
        make: "",
        model: "",
        year: "",
        price: "",
        location: "",
        bodyType: "",
        mileage: "",
        fuel: "",
        transmission: "",
        engine: "",
        dealer: "",
        phone: "",
        whatsapp: "",
        description: "",
      });

      setCoverImage("");
      setGalleryImages([]);
      setFeatured(false);
      setVerified(true);
      setBestDeal(false);

    } catch (error) {
      console.error("❌ SAVE FAILED:", error);
      alert("Failed to save vehicle. Check console for error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Add Vehicle</h1>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Vehicle Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input name="make" value={formData.make} onChange={handleChange} placeholder="Make" className="border rounded-xl p-4" />
          <input name="model" value={formData.model} onChange={handleChange} placeholder="Model" className="border rounded-xl p-4" />
          <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="border rounded-xl p-4" />
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border rounded-xl p-4" />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border rounded-xl p-4" />

          <select name="bodyType" value={formData.bodyType} onChange={handleChange} className="border rounded-xl p-4">
            <option value="">Select Body Type</option>
            <option>SUV</option>
            <option>Sedan</option>
            <option>Pickup</option>
            <option>Luxury</option>
            <option>Hatchback</option>
            <option>Van</option>
            <option>Crossover</option>
          </select>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Specifications</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Mileage" className="border rounded-xl p-4" />

          <select name="fuel" value={formData.fuel} onChange={handleChange} className="border rounded-xl p-4">
            <option value="">Fuel Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </select>

          <select name="transmission" value={formData.transmission} onChange={handleChange} className="border rounded-xl p-4">
            <option value="">Transmission</option>
            <option>Automatic</option>
            <option>Manual</option>
          </select>

          <input name="engine" value={formData.engine} onChange={handleChange} placeholder="Engine" className="border rounded-xl p-4" />
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Seller Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input name="dealer" value={formData.dealer} onChange={handleChange} placeholder="Dealer Name" className="border rounded-xl p-4" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="border rounded-xl p-4" />
          <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" className="border rounded-xl p-4" />
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Description</h2>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Vehicle description..."
          className="w-full border rounded-xl p-4 h-40"
        />

        <h2 className="text-2xl font-bold mt-12 mb-6">Vehicle Images</h2>

        <div className="space-y-8">
          <div>
            <label className="block mb-2 font-semibold">Cover Image</label>

            <input type="file" accept="image/*" onChange={handleCoverImage} className="w-full border rounded-xl p-3" />

            {coverImage && (
              <img src={coverImage} alt="Cover Preview" className="mt-4 h-56 rounded-2xl object-cover" />
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold">Gallery Images</label>

            <input type="file" accept="image/*" multiple onChange={handleGalleryImages} className="w-full border rounded-xl p-3" />

            <div className="flex flex-wrap gap-3 mt-4">
              {galleryImages.map((image, index) => (
                <img key={index} src={image} className="w-24 h-24 rounded-xl object-cover" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-10 mt-10">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={featured} onChange={() => setFeatured(!featured)} />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={bestDeal} onChange={() => setBestDeal(!bestDeal)} />
            Best Deal
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={verified} onChange={() => setVerified(!verified)} />
            Verified
          </label>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Vehicle"}
        </button>
      </div>
    </div>
  );
}