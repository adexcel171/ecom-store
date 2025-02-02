import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { FaPaypal, FaMoneyBillWave } from "react-icons/fa";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ProgressSteps step1 step2 />

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Shipping Details
          </h1>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="123 Main Street"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter city"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter phone number"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "PayPal"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      className="form-radio text-purple-600"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <FaPaypal className="w-6 h-6 text-blue-500" />
                    <span className="text-gray-700 font-medium">PayPal</span>
                  </div>
                </label>

                <label
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "Paystack"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      className="form-radio text-green-600"
                      name="paymentMethod"
                      value="Paystack"
                      checked={paymentMethod === "Paystack"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <FaMoneyBillWave className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700 font-medium">Paystack</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-101"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
