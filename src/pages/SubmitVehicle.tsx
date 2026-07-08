import { useState } from "react";
import {
  Car,
  User,
  FileText,
  Image as ImageIcon,
  Info,
  Upload,
  Send,
} from "lucide-react";

import { uploadImage } from "../utils/uploadImage";
import { savePendingVehicle } from "../utils/vehicleStorage";
import { compressImage } from "../utils/compressImage";

/* =========================
DEBUG LOG
========================= */
const log = (msg: string, data?: any) => {
  console.log(`[SubmitVehicle] ${msg}`, data || "");
};

/* =========================
SAFE TIMEOUT WRAPPER
========================= */
const timeout = (ms: number) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );

/* =========================
RACE SAFE UPLOAD (CRITICAL FIX)
========================= */
const safeUploadImage = async (file: File, index: number) => {
  try {
    log(`Compressing image ${index}`);

    const compressed = await Promise.race([
      compressImage(file),
      timeout(15000),
    ]) as File;

    log(`Uploading image ${index}`);

    const upload = uploadImage(compressed);

    const url = (await Promise.race([
      upload,
      timeout(30000),
    ])) as string;

    log(`Upload success ${index}`, url);

    return url;
  } catch (err) {
    console.error(`[Upload FAILED ${index}]`, err);

    // fallback BUT still logged
    return "/cars/default.jpg";
  }
};

/* =========================
UI COMPONENTS
========================= */
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
};

function Input({
  label,
  required = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        {...props}
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 ${className}`}
      />
    </div>
  );
}
type SelectFieldProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    required?: boolean;
    options: string[];
  };

function SelectField({
  label,
  required = false,
  options,
  className = "",
  ...props
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <select
        {...props}
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all duration-200 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 ${className}`}
      >
        <option value="">Select...</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    required?: boolean;
    showCount?: boolean;
  };

function TextArea({
  label,
  required = false,
  showCount = false,
  value,
  className = "",
  ...props
}: TextAreaProps) {
  const text = String(value ?? "");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-800">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        {showCount && (
          <span className="text-xs text-gray-400">
            {text.length} characters
          </span>
        )}
      </div>

      <textarea
        {...props}
        value={value}
        className={`min-h-[170px] w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-100 ${className}`}
      />
    </div>
  );
}
type UploadPanelProps = {
  title: string;
  description: string;
  multiple?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function UploadPanel({
  title,
  description,
  multiple = false,
  onChange,
}: UploadPanelProps) {
  return (
    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center transition-all duration-200 hover:border-red-400 hover:bg-red-50">
      <div className="mb-4 rounded-full bg-red-100 p-4">
        <Upload className="h-7 w-7 text-red-600" />
      </div>

      <h3 className="font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>

      <span className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-red-700">
        Choose File
      </span>

      <input
        hidden
        type="file"
        multiple={multiple}
        onChange={onChange}
      />
    </label>
  );
}
type SectionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function Section({
  title,
  description,
  icon,
  children,
}: SectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-red-100 p-3">
            {icon}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {children}
      </div>
    </section>
  );
}

/* =========================
MAIN COMPONENT
========================= */
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

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleCoverImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setCoverImage(file);
  };

  const handleGalleryImages = (e: any) => {
  const fileList = e.target.files;

  if (!fileList) return;

  const files: File[] = Array.from(fileList);

  const limitedFiles = files.slice(0, 5);

  setGalleryImages(limitedFiles);

  log("Selected images", limitedFiles.length);
};

  /* =========================
  SUBMIT FLOW (FIXED)
  ========================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      log("SUBMIT START");

      let coverUrl = "/cars/default.jpg";

      if (coverImage) {
        coverUrl = await safeUploadImage(coverImage, 0);
      }

      log("Cover ready", coverUrl);

      const galleryUrls = await Promise.all(
        galleryImages.map((img, i) =>
          safeUploadImage(img, i + 1)
        )
      );

      log("Gallery ready", galleryUrls);

      const vehicle = {
        ...formData,
        image: coverUrl,
        images: galleryUrls,
        status: "pending",
        createdAt: Date.now(),
      };

      log("Saving vehicle", vehicle);

      // CRITICAL: prevent freeze
      const savePromise = savePendingVehicle(vehicle);

      await Promise.race([
        savePromise,
        timeout(20000),
      ]);

      log("SAVE SUCCESS");

      alert("Vehicle submitted!");

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

      setCoverImage(null);
      setGalleryImages([]);

      log("RESET DONE");
    } catch (err) {
      console.error("[SUBMIT FAILED]", err);
      alert("Submission failed. Check console.");
    } finally {
      setLoading(false);
      log("SUBMIT END");
    }
  };

  /* =========================
  UI
  ========================= */
  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm">
  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
    Submit Vehicle
  </h1>

  <p className="mt-3 max-w-2xl text-base text-gray-500">
    Fill in the details below to submit your vehicle for review.
  </p>
</div>

        <Section
  title="Vehicle Information"
  description="Provide the essential specifications and details about your vehicle."
  icon={<Car className="h-6 w-6 text-red-600" />}
>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

  <Input
    label="Make"
    required
    name="make"
    value={formData.make}
    onChange={handleChange}
    placeholder="e.g. Toyota"
  />

  <Input
    label="Model"
    required
    name="model"
    value={formData.model}
    onChange={handleChange}
    placeholder="e.g. Land Cruiser"
  />

  <Input
    label="Year"
    required
    name="year"
    value={formData.year}
    onChange={handleChange}
    placeholder="e.g. 2022"
  />

  <Input
    label="Price"
    required
    name="price"
    value={formData.price}
    onChange={handleChange}
    placeholder="UGX 85,000,000"
  />

  <Input
    label="Location"
    required
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder="Kampala"
  />

  <SelectField
    label="Condition"
    required
    name="condition"
    value={formData.condition}
    onChange={handleChange}
    options={[
      "Brand New",
      "Foreign Used",
      "Locally Used",
    ]}
  />

  <Input
    label="Body Type"
    name="bodyType"
    value={formData.bodyType}
    onChange={handleChange}
    placeholder="SUV"
  />

  <Input
    label="Mileage"
    name="mileage"
    value={formData.mileage}
    onChange={handleChange}
    placeholder="45,000 km"
  />

  <SelectField
    label="Fuel Type"
    name="fuel"
    value={formData.fuel}
    onChange={handleChange}
    options={[
      "Petrol",
      "Diesel",
      "Hybrid",
      "Electric",
    ]}
  />

  <SelectField
    label="Transmission"
    name="transmission"
    value={formData.transmission}
    onChange={handleChange}
    options={[
      "Automatic",
      "Manual",
      "CVT",
    ]}
  />

  <Input
    label="Engine Size"
    name="engine"
    value={formData.engine}
    onChange={handleChange}
    placeholder="2800cc"
  />

  <Input
    label="Drivetrain"
    name="drivetrain"
    value={formData.drivetrain}
    onChange={handleChange}
    placeholder="4WD"
  />

  <Input
    label="Color"
    name="color"
    value={formData.color}
    onChange={handleChange}
    placeholder="Pearl White"
  />

  <Input
    label="Seats"
    name="seats"
    value={formData.seats}
    onChange={handleChange}
    placeholder="7"
  />

</div>
        </Section>

        {/* ================= Seller Information ================= */}

<Section
  title="Seller Information"
  description="Tell buyers how they can reach you."
  icon={<User className="h-6 w-6 text-red-600" />}
>
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

    <Input
      label="Dealer Name"
      required
      name="dealer"
      value={formData.dealer}
      onChange={handleChange}
      placeholder="Your dealership or full name"
    />

    <Input
      label="Phone Number"
      required
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="+256..."
    />

    <Input
      label="WhatsApp Number"
      name="whatsapp"
      value={formData.whatsapp}
      onChange={handleChange}
      placeholder="+256..."
    />

  </div>
</Section>

<Section
  title="Vehicle Description"
  description="Provide additional information that may help buyers."
  icon={<FileText className="h-6 w-6 text-red-600" />}
>
  <TextArea
    label="Description"
    required
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Describe the vehicle's condition, service history, accessories, ownership history, and any other important details..."
    showCount
  />
</Section>

<Section
  title="Vehicle Images"
  description="Upload one cover image and up to five gallery images."
  icon={<ImageIcon className="h-6 w-6 text-red-600" />}
>
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

    <UploadPanel
      title="Cover Image"
      description="Upload the main image buyers will see first."
      onChange={handleCoverImage}
    />

    <UploadPanel
      title="Gallery Images"
      description="Upload up to five additional vehicle photos."
      multiple
      onChange={handleGalleryImages}
    />

  </div>

  {(coverImage || galleryImages.length > 0) && (
    <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-4">

      <h4 className="font-semibold text-green-800">
        Selected Files
      </h4>

      <div className="mt-3 space-y-2 text-sm text-green-700">

        {coverImage && (
          <div>
            <strong>Cover:</strong> {coverImage.name}
          </div>
        )}

        {galleryImages.length > 0 && (
          <div>
            <strong>Gallery:</strong> {galleryImages.length} image(s) selected
          </div>
        )}

      </div>

    </div>
  )}

</Section>

<Section
  title="Review Process"
  description="What happens after you submit?"
  icon={<Info className="h-6 w-6 text-red-600" />}
>
  <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

    <p className="text-sm leading-7 text-gray-700">

      After submitting your vehicle, our team will review the information,
      verify the uploaded images and ensure everything meets our listing
      standards. Once approved, your vehicle will become visible on the website.

    </p>

  </div>
</Section>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

  <button
    onClick={handleSubmit}
    disabled={loading}
    className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
  >
    <Send className="h-5 w-5" />

    {loading
      ? "Submitting Vehicle..."
      : "Submit Vehicle for Review"}
  </button>

</div>

      </div>
    </div>
  );
}