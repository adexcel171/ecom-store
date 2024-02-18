import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from "dotenv";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import mongoose from 'mongoose';
dotenv.config();


const router = express.Router();

export default router;
