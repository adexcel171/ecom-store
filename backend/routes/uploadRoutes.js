import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from "dotenv";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import mongoose from 'mongoose';
dotenv.config();


const router = express.Router();

// Configure Cloudinary
console.log('Cloudinary Config:', {
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

console.log('Cloudinary Config:', cloudinary.config());


// Set up Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'online-shop', // Specify the folder in Cloudinary where you want to store images
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    use_filename: true,
  },
});

const upload = multer({ storage });
const uploadSingleImage = upload.single('image');

// Mongoose model for storing image data in MongoDB
const ImageModel = mongoose.model('Image', {
  
});

router.post('/', (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);


    if (err) {
      return res.status(400).send({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).send({ message: 'No image file provided' });
    }

    try {
      // Save image URL to MongoDB (no need to remove '/uploads/' prefix)
      const imagePath = req.file.path;
      const image = new ImageModel({ path: imagePath });
      await image.save();

      res.status(200).send({
        message: 'Image uploaded and saved successfully',
        image: imagePath,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
});

export default router;
