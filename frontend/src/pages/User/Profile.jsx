import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-black mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 w-[400px] text-black py-2 px-4 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
      <h1 className=" font-bold text-center text-2xl mt-8 ">Check Orders</h1>
      <div className="flex justify-center items-center gap-3 mt-4 flex-wrap md:flex lg:flex">
        {orders?.map((order, index) => (
          <div
            key={order._id}
            className="bg-white shadow-md p-4 w-[300px] rounded-lg flex flex-col items-center"
          >
            <div className="text-lg font-bold mb-2">Order #{index + 1}</div>
            <div className="bg-blue-400 w-full text-white py-2 px-4 rounded text-center">
              <Link
                to={`/order/${order._id}`}
                className="text-white hover:underline"
              >
                View Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
