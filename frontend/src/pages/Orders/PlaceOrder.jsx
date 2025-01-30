import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { FaBox, FaShippingFast, FaCreditCard } from "react-icons/fa";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ProgressSteps step1 step2 step3 />

        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            {/* Order Items Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaBox className="mr-2 text-purple-600" />
                Order Items
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left text-sm font-semibold">
                        Product
                      </th>
                      <th className="p-3 text-center text-sm font-semibold">
                        Qty
                      </th>
                      <th className="p-3 text-right text-sm font-semibold">
                        Price
                      </th>
                      <th className="p-3 text-right text-sm font-semibold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.cartItems.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg mr-3"
                            />
                            <Link
                              to={`/product/${item.product}`}
                              className="hover:text-purple-600"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </td>
                        <td className="p-3 text-center">{item.qty}</td>
                        <td className="p-3 text-right">
                          ₦{item.price.toLocaleString()}
                        </td>
                        <td className="p-3 text-right font-medium">
                          ₦{(item.qty * item.price).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Shipping & Payment Info */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaShippingFast className="mr-2 text-blue-500" />
                    Shipping Details
                  </h3>
                  <p className="text-gray-600">
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}
                    <br />
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaCreditCard className="mr-2 text-green-500" />
                    Payment Method
                  </h3>
                  <p className="text-gray-600">{cart.paymentMethod}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span className="font-medium">
                      ₦{cart.itemsPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-medium">
                      ₦{cart.shippingPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span className="font-medium">
                      ₦{cart.taxPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold text-purple-600">
                      ₦{cart.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {error && (
                  <Message variant="danger" className="mt-4">
                    {error.data.message}
                  </Message>
                )}

                <button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0 || isLoading}
                  className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                    cart.cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  }`}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </button>

                {isLoading && <Loader className="mt-4" />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
