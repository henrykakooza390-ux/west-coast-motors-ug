import cloudinaryConfig from "../config/cloudinary";

export const uploadImage = async (
  file: File,
  retries = 3
): Promise<string> => {
  console.log("[UPLOAD] Starting upload", file.name);

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    cloudinaryConfig.uploadPreset
  );

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `[UPLOAD] Attempt ${attempt}`
      );

      const response = await fetch(
  `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
  {
    method: "POST",
    body: formData,
  }
);

const data = await response.json();

if (!response.ok) {
  console.error(
    "[CLOUDINARY ERROR]",
    data
  );

  throw new Error(
    data?.error?.message ||
    `Cloudinary upload failed: ${response.status}`
  );
}

console.log(
  "[UPLOAD SUCCESS]",
  data.secure_url
);

return data.secure_url;
    } catch (error) {
      console.error(
        `[UPLOAD] Attempt ${attempt} failed`,
        error
      );

      if (attempt === retries) {
        throw error;
      }

      await new Promise((r) =>
        setTimeout(r, 1000 * attempt)
      );
    }
  }

  throw new Error("Upload failed");
};