import { initializeApp } from 'firebase/app';
import { useUploadProductImageMutation, useCreateProductMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useNavigate } from 'react-router-dom';
import { getStorage, ref,  uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import React, { useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCiaFGlP6V9QIB74rW9PS_MLizhHMwwSj0",
  authDomain: "mern-store-91eb2.firebaseapp.com",
  projectId: "mern-store-91eb2",
  storageBucket: "mern-store-91eb2.appspot.com",
  messagingSenderId: "914133497618",
  appId: "1:914133497618:web:a1b35bcaeac635a1cbe5cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const ProductList = () => {

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();


  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const uploadFileHandler = async (e) => {
    e.preventDefault();
  
    const selectedFile = e.target.files[0];
  
    try {
      // Check if image is valid
      if (!selectedFile) {
        console.error("No image file provided");
        toast.error("No image file provided");
        return;
      }
  
      const fileName = new Date().getTime() + selectedFile.name;
  
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
  
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.error('Error uploading image:', error.message);
          toast.error("Error uploading image");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            setImageLoaded(true);
            toast.success("Image uploaded successfully");
          });
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error.message);
      toast.error("Error uploading image");
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", imageUrl);
      productData.append("name", name);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("description", description);
      productData.append("countInStock", stock);
      productData.append("category", category);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-3/4 pt-3 mt-10">
      <AdminMenu />

        <div className="h-12">Create Product</div>
  
        {imageLoaded && imageUrl && (
          <div className="text-center">
            <img
              src={imageUrl}
              alt="product"
              className="block mx-auto max-h-[200px]"
            />
          </div>
        )}
  
        <div className="mb-3">
          <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
            {image ? image.name : "Upload Image"}
  
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                setImage(null);
                uploadFileHandler(e);
              }}
              className={!imageUrl ? "hidden" : "text-white"}
            />
          </label>
        </div>
  
        <div className="p-3">
          <div className="flex flex-wrap">
            <div className="one w-full sm:w-[100%] md:w-[50%]">
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="two ml-0 sm:ml-0 md:ml-10 w-full sm:w-[100%] md:w-[50%]">
              <label htmlFor="name block">Price</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="one w-full sm:w-[100%] md:w-[50%]">
              <label htmlFor="name block">Quantity</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="two ml-0 sm:ml-0 md:ml-10 w-full sm:w-[100%] md:w-[50%]">
              <label htmlFor="name block">Brand</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
  
          <label htmlFor="" className="my-5">
            Description
          </label>
          <textarea
            type="text"
            className="p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
  
          <div className="flex justify-between flex-wrap">
            <div className="w-full sm:w-[100%] md:w-[48%] mb-3 md:mb-0">
              <label htmlFor="name block">Count In Stock</label> <br />
              <input
                type="text"
                className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
  
            <div className="w-full sm:w-[100%] md:w-[48%]">
              <label htmlFor="">Category</label> <br />
              <select
                placeholder="Choose Category"
                className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          <button
            onClick={handleSubmit}
            className="py-5 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ProductList;