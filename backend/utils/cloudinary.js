import dotenv from "dotenv";
import cloudinaryModule from "cloudinary";

dotenv.config()
const cloudinary = cloudinaryModule.v2

cloudinary.config({

    cloud_name:process.env.cloud_name,
    api_key:process.env.cloudinary_api_key,
    api_secret:process.env.cloudinary_api_secret,
});

export default cloudinary;
