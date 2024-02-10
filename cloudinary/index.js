import { config } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

try {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
} catch (error) {
  console.error("Error configuring Cloudinary:", error.message);
  throw error;
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ACamp",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

export { cloudinary, storage };
