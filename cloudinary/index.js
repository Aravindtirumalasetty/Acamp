import { config } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

try {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dfyyarbvp",
    api_key: process.env.CLOUDINARY_KEY || 464476782244927,
    api_secret: process.env.CLOUDINARY_SECRET || "1TsCsgbY1FrsOkmjVSV-On64XYo",
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
