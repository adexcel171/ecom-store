import { initializeApp } from "firebase/app";
import {
  useUploadProductImageMutation,
  useCreateProductMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import React, { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCiaFGlP6V9QIB74rW9PS_MLizhHMwwSj0",
  authDomain: "mern-store-91eb2.firebaseapp.com",
  projectId: "mern-store-91eb2",
  storageBucket: "mern-store-91eb2.appspot.com",
  messagingSenderId: "914133497618",
  appId: "1:914133497618:web:a1b35bcaeac635a1cbe5cb",
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          console.error("Error uploading image:", error.message);
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
      console.error("Error uploading image:", error.message);
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
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 mx-auto w-full">
          <AdminMenu />

          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8 flex items-center justify-center">
              <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
              Create Product
              <span className="w-2 h-8 bg-blue-500 rounded-full ml-3"></span>
            </h2>

            {imageLoaded && imageUrl && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <img
                  src={imageUrl}
                  alt="product"
                  className="block mx-auto max-h-[200px] rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="relative block p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
                <div className="text-center">
                  <div className="text-gray-600 group-hover:text-blue-500 transition-colors mb-2">
                    {image ? (
                      <span className="font-medium text-blue-500">
                        {image.name}
                      </span>
                    ) : (
                      <>
                        <i className="fas fa-cloud-upload-alt text-3xl mb-2"></i>
                        <p>Upload Image</p>
                      </>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(null);
                    uploadFileHandler(e);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  placeholder="Enter product name..."
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  placeholder="Enter product price..."
                  type="number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  placeholder="Enter quantity available"
                  type="number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  placeholder="Enter product brand"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Count In Stock
                </label>
                <input
                  placeholder="Count in stock"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="About Product"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-800 min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors font-medium"
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
