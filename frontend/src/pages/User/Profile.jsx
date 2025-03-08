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
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

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
    <div className="container mx-auto px-4 py-8 mt-16">
      {" "}
      {/* Adjusted mt-16 for navbar */}
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {/* Profile Update Section */}
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Update Profile
          </h2>
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="bg-teal-600 text-white py-2 px-6 rounded-full font-semibold text-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 disabled:opacity-50"
              >
                {loadingUpdateProfile ? "Updating..." : "Update"}
              </button>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            My Orders
          </h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 text-center">
              Error loading orders: {error.message}
            </p>
          ) : orders?.length === 0 ? (
            <p className="text-gray-600 text-center">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders?.map((order, index) => (
                <div
                  key={order._id}
                  className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    Order #{index + 1}
                  </div>
                  <Link
                    to={`/order/${order._id}`}
                    className="bg-teal-600 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-teal-700 transition-all duration-300"
                  >
                    View Order
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
