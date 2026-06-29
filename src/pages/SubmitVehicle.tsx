import { useState } from "react";
import { savePendingVehicle } from "../utils/vehicleStorage";

/* =========================
UI COMPONENTS
MOVED OUTSIDE COMPONENT
========================= */

function Input(props: any) {
  return (
    <input
      {...props}
      className="
        w-full
        px-4
        py-3
        border
        border-gray-200
        rounded-xl
        outline-none
        focus:ring-2
        focus:ring-blue-500
        bg-white
      "
    />
  );
}

function Select(props: any) {
  return (
    <select
      {...props}
      className="
        w-full
        px-4
        py-3
        border
        border-gray-200
        rounded-xl
        outline-none
        focus:ring-2
        focus:ring-blue-500
        bg-white
      "
    />
  );
}

export default function SubmitVehicle() {
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
    condition: "",
    drivetrain: "",
    color: "",
    seats: "",
  });

  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoverImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () =>
      setCoverImage(reader.result as string);

    reader.readAsDataURL(file);
  };

  const handleGalleryImages = (e: any) => {
    const files = Array.from(e.target.files || []);

    Promise.all(
      files.map(
        (file: any) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();

            reader.onloadend = () =>
              resolve(reader.result as string);

            reader.readAsDataURL(file);
          })
      )
    ).then(setGalleryImages);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const vehicle = {
        ...formData,

        image:
          coverImage || "/cars/default.jpg",

        images: galleryImages.length
          ? galleryImages
          : [
              coverImage ||
                "/cars/default.jpg",
            ],

        status: "pending",
        featured: false,
        verified: false,
        bestDeal: false,
        createdAt: Date.now(),
      };

      console.log(
        "Submitting vehicle:",
        vehicle
      );

      await savePendingVehicle(vehicle);

      alert(
        "Vehicle submitted for review!"
      );

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
        condition: "",
        drivetrain: "",
        color: "",
        seats: "",
      });

      setCoverImage("");
      setGalleryImages([]);
    } catch (error) {
      console.error(
        "Submit error:",
        error
      );

      alert(
        "Failed to submit vehicle"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Submit Vehicle
          </h1>

          <p className="text-gray-500 mt-1">
            Fill in the details below
            to submit your vehicle
            for review.
          </p>
        </div>

        {/* VEHICLE INFO */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Vehicle Information
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <Input
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="Make"
            />

            <Input
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Model"
            />

            <Input
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
            />

            <Input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />

            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />

            <Select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="">
                Condition
              </option>
              <option>
                New
              </option>
              <option>
                Used
              </option>
            </Select>

            <Input
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              placeholder="Body Type"
            />

            <Input
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="Mileage"
            />

            <Input
              name="fuel"
              value={formData.fuel}
              onChange={handleChange}
              placeholder="Fuel Type"
            />

            <Input
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              placeholder="Transmission"
            />

            <Input
              name="drivetrain"
              value={formData.drivetrain}
              onChange={handleChange}
              placeholder="Drivetrain"
            />

            <Input
              name="engine"
              value={formData.engine}
              onChange={handleChange}
              placeholder="Engine Size"
            />

            <Input
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Color"
            />

            <Input
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="Seats"
            />

          </div>
        </div>

        {/* SELLER INFO */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Seller Information
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <Input
              name="dealer"
              value={formData.dealer}
              onChange={handleChange}
              placeholder="Dealer Name"
            />

            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            <Input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp Number"
            />

          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Vehicle Description
          </h2>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            placeholder="Describe the vehicle condition, features, etc..."
            className="
              w-full
              h-40
              px-4
              py-3
              border
              border-gray-200
              rounded-xl
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          />
        </div>

        {/* IMAGES */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Vehicle Images
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border-2 border-dashed rounded-2xl p-6 text-center bg-gray-50">
              <p className="font-medium mb-2">
                Cover Image
              </p>

              <input
                type="file"
                onChange={
                  handleCoverImage
                }
              />
            </div>

            <div className="border-2 border-dashed rounded-2xl p-6 text-center bg-gray-50">
              <p className="font-medium mb-2">
                Gallery Images
              </p>

              <input
                type="file"
                multiple
                onChange={
                  handleGalleryImages
                }
              />
            </div>

          </div>
        </div>

        {/* SUBMIT */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-4
              rounded-2xl
              font-semibold
              text-lg
              transition
            "
          >
            {loading
              ? "Submitting..."
              : "Submit Vehicle for Review"}
          </button>
        </div>

      </div>
    </div>
  );
}