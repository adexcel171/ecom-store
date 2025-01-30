import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { PaystackButton } from "react-paystack";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookMessenger,
  FaBox,
} from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const [orderIsPaid, setOrderIsPaid] = useState(false);
  const [usdAmount, setUsdAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [loadingConversion, setLoadingConversion] = useState(false);

  // Function to fetch current NGN to USD conversion rate
  const fetchConversionRate = async () => {
    try {
      setLoadingConversion(true);
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/NGN`
      );
      const data = await response.json();
      const rate = data.rates.USD;
      setConversionRate(rate);

      // Convert NGN to USD
      if (order?.totalPrice) {
        const convertedAmount = (order.totalPrice * rate).toFixed(2);
        setUsdAmount(convertedAmount);
      }
    } catch (error) {
      toast.error("Error fetching conversion rate. Please try again.");
      console.error("Conversion error:", error);
    } finally {
      setLoadingConversion(false);
    }
  };

  useEffect(() => {
    if (order && order.paymentMethod === "PayPal") {
      fetchConversionRate();
    }
  }, [order]);

  // Modified PayPal script loader
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
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

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  // Modified createOrder function for PayPal
  function createOrder(data, actions) {
    if (!usdAmount || usdAmount <= 0) {
      toast.error("Invalid conversion amount");
      return;
    }

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: usdAmount,
              currency_code: "USD",
            },
            description: `Order ${order._id} - Converted from ₦${order.totalPrice} NGN`,
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  // Modified onApprove function
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
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
        refetch();
        toast.success("Payment successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  const handlePaystackPayment = async (reference) => {
    try {
      const result = await payOrder({
        orderId,
        details: {
          id: reference.reference,
          status: "COMPLETED",
          update_time: new Date().toISOString(),
          payer: { email_address: order.user.email },
        },
      }).unwrap();

      if (result && !result.error) {
        setOrderIsPaid(true);
        await refetch();
        toast.success("Payment successful");
      } else {
        toast.error("Error updating order. Please contact support.");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: order?.user?.email,
    amount: order?.totalPrice * 100, // Paystack amount is in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Order Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Order Summary
            </h1>
            <p className="text-gray-600 mt-2">Order ID: {order._id}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="border-b pb-4 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaBox className="mr-2 text-purple-500" />
                  Order Items
                </h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
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
                        {order.orderItems.map((item, index) => (
                          <tr key={index} className="border-b">
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
                              ₦{item.price.toFixed(2)}
                            </td>
                            <td className="p-3 text-right font-medium">
                              ₦{(item.qty * item.price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Shipping Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <RiMoneyDollarCircleLine className="mr-2 text-blue-500" />
                  Shipping Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="font-medium">{order.user.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{order.user.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-600">Shipping Address</p>
                    <p className="font-medium">
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}
                      <br />
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    ₦{order.itemsPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium">
                    ₦{order.shippingPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="font-medium">
                    ₦{order.taxPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold text-purple-600">
                    ₦{order.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Status */}
              <div className="mb-6">
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on {new Date(order.paidAt).toLocaleDateString()}
                  </Message>
                ) : (
                  <Message variant="danger">Payment Pending</Message>
                )}
              </div>

              {/* Payment Methods */}
              {!order.isPaid && (
                <div className="space-y-4">
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <>
                      {order.paymentMethod === "PayPal" && (
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          {loadingConversion ? (
                            <Loader />
                          ) : (
                            <>
                              <div className="text-sm bg-purple-50 p-3 rounded-lg mb-4">
                                <p className="text-gray-600">
                                  <span className="font-medium">
                                    Conversion:
                                  </span>{" "}
                                  ₦1 = ${conversionRate}
                                </p>
                                <p className="text-gray-600">
                                  <span className="font-medium">Total:</span> $
                                  {usdAmount}
                                </p>
                              </div>
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
                          text="Pay with Paystack"
                          onSuccess={handlePaystackPayment}
                          onClose={() => toast.error("Payment cancelled")}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                        />
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Social Proof */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Need help with your order? Contact us via:
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    to="https://wa.me/2348119223162"
                    className="text-green-500 hover:text-green-600 transition-colors"
                  >
                    <FaWhatsapp size={28} />
                  </Link>
                  <Link
                    to="https://www.instagram.com/admire_excellence"
                    className="text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    <FaInstagram size={28} />
                  </Link>
                  <Link
                    to="https://www.facebook.com/godswill.okenyi/"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <FaFacebookMessenger size={28} />
                  </Link>
                </div>
              </div>

              {/* Admin Delivery */}
              {loadingDeliver && <Loader />}
              {(order.isPaid || orderIsPaid) &&
                userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered && (
                  <button
                    onClick={deliverHandler}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition-all"
                  >
                    Mark as Delivered
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
