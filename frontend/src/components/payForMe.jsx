// PayForMe.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PaystackButton } from "react-paystack";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../redux/api/orderApiSlice";
import { FaHeart, FaGift, FaShareAlt } from "react-icons/fa";

const PayForMe = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const [usdAmount, setUsdAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [loadingConversion, setLoadingConversion] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const shareLink = `${window.location.origin}/pay-for-me/${orderId}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  // Fetch NGN to USD conversion rate
  const fetchConversionRate = async () => {
    try {
      setLoadingConversion(true);
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/NGN`
      );
      const data = await response.json();
      const rate = data.rates.USD;
      setConversionRate(rate);
      if (order?.totalPrice) {
        setUsdAmount((order.totalPrice * rate).toFixed(2));
      }
    } catch (error) {
      toast.error("Error fetching conversion rate.");
    } finally {
      setLoadingConversion(false);
    }
  };

  useEffect(() => {
    if (order && order.paymentMethod === "PayPal") {
      fetchConversionRate();
    }
  }, [order]);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (!order?.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  // PayPal Functions
  const createOrder = (data, actions) => {
    if (!usdAmount || usdAmount <= 0) {
      toast.error("Invalid conversion amount");
      return;
    }
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: usdAmount, currency_code: "USD" },
            description: `Paying for ${order.user.username}'s Order ${order._id}`,
          },
        ],
      })
      .then((orderID) => orderID);
  };

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    try {
      const paymentResult = {
        id: details.id,
        status: details.status,
        update_time: details.update_time,
        payer: details.payer,
        currency_conversion: {
          from_currency: "NGN",
          to_currency: "USD",
          conversion_rate: conversionRate,
          original_amount: order.totalPrice,
          converted_amount: usdAmount,
        },
      };
      await payOrder({ orderId, details: paymentResult });
      toast.success(`Thanks for paying for ${order.user.username}!`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const onError = (err) => toast.error(err.message);

  // Paystack Payment
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: userInfo?.email || "payer@example.com",
    amount: order?.totalPrice * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const handlePaystackPayment = async (reference) => {
    try {
      await payOrder({
        orderId,
        details: {
          id: reference.reference,
          status: "COMPLETED",
          update_time: new Date().toISOString(),
          payer: { email_address: userInfo?.email || "payer@example.com" },
        },
      });
      toast.success(`Thanks for paying for ${order.user.username}!`);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
            Pay for {order.user.username}’s Wishlist! 💕
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {order.user.username} picked these amazing items. Be their hero and
            pay for them!
          </p>

          <div className="space-y-6">
            {order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
                    Quantity: {item.qty} | ₦{item.price.toLocaleString()} each
                  </p>
                  <p className="text-purple-600 font-medium">
                    Total: ₦{(item.qty * item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
              <FaGift className="mr-2" />
              Order Total
            </h2>
            <p className="text-gray-700">
              <span className="font-medium">Subtotal:</span> ₦
              {order.itemsPrice.toLocaleString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Shipping:</span> ₦
              {order.shippingPrice.toLocaleString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Tax:</span> ₦
              {order.taxPrice.toLocaleString()}
            </p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              Total: ₦{order.totalPrice.toLocaleString()}
            </p>
          </div>

          {!order.isPaid && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Make {order.user.username} Happy! 💖
              </h3>
              {loadingPay && <Loader />}
              {order.paymentMethod === "PayPal" && (
                <div className="bg-white rounded-lg p-4 shadow-md">
                  {loadingConversion ? (
                    <Loader />
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-2">
                        Converted to USD: ${usdAmount} (Rate: ₦1 = $
                        {conversionRate})
                      </p>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </>
                  )}
                </div>
              )}
              {order.paymentMethod === "Paystack" && (
                <PaystackButton
                  {...paystackConfig}
                  text={`Pay ₦${order.totalPrice.toLocaleString()} for ${
                    order.user.username
                  }`}
                  onSuccess={handlePaystackPayment}
                  onClose={() => toast.error("Payment cancelled")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors mt-4"
                />
              )}
            </div>
          )}
          <button
            onClick={handleCopyLink}
            className="w-full mb-4 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
          >
            <FaShareAlt className="mr-2" />
            Copy Shareable Link
          </button>

          {order.isPaid && (
            <Message variant="success" className="mt-6">
              This order was paid on{" "}
              {new Date(order.paidAt).toLocaleDateString()}. Thank you!
            </Message>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayForMe;
