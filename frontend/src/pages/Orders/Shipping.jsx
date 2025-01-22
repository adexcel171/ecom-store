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
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };
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

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10 px-3">
      {/* <ProgressSteps step1 step2 /> */}
      <div className="mt-10 px-4 flex flex-col justify-center items-center">
        <form onSubmit={submitHandler} className="max-w-screen-md w-full mt-10">
          <h1 className="text-2xl font-semibold mb-4 text-center">Shipping</h1>
          <div className="mb-4">
            <label className="block text-black mb-2">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2">Postal Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2">Country</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Select Payment Method</label>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaPaypal className="ml-2 mr-2 text-blue-500" />
                <span>PayPal</span>
              </label>
              <br />
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-500"
                  name="paymentMethod"
                  value="Paystack"
                  checked={paymentMethod === "Paystack"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaMoneyBillWave className="ml-2 mr-2 text-green-500" />
                <span>Paystack</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-full text-lg w-full sm:w-[200px]"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
