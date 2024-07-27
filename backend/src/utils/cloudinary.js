import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("error cloudinary", error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (fileUrl) {
      // Delete the existing  image from Cloudinary
      const publicId = fileUrl.split("/").pop().split(".")[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.log(
      `Error while deleting file(${publicId}) from cloudinary`,
      error
    );
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
