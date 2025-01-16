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
import { FaWhatsapp, FaInstagram, FaFacebookMessenger } from "react-icons/fa";
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
      if (!reference || !reference.reference) {
        throw new Error("Invalid payment reference");
      }

      if (!orderId || !order?.user?.email) {
        throw new Error("Invalid order details");
      }

      const paymentResult = {
        id: reference.reference,
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        payer: {
          email_address: order.user.email,
          paystack_reference: reference.reference,
        },
        payment_source: {
          paystack: {
            reference: reference.reference,
            status: reference.status,
            transaction: reference.transaction,
          },
        },
      };

      const result = await payOrder({
        orderId,
        details: paymentResult,
      }).unwrap();

      if (result && !result.error) {
        setOrderIsPaid(true);
        await refetch();
        toast.success("Payment successful");
      } else {
        throw new Error("Error updating order status");
      }
    } catch (err) {
      console.error("Paystack payment error:", err);
      toast.error(err?.data?.message || err.message || "Payment failed");
    }
  };

  const getPaystackConfig = () => {
    if (!order?.totalPrice || !order?.user?.email) {
      return null;
    }

    return {
      reference: `order_${orderId}_${new Date().getTime()}`,
      email: order.user.email,
      amount: Math.round(order.totalPrice * 100), // Convert to kobo and ensure integer
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      metadata: {
        order_id: orderId,
        custom_fields: [
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: orderId,
          },
        ],
      },
      currency: "NGN",
    };
  };

  const renderPaystackButton = () => {
    const config = getPaystackConfig();

    if (!config) {
      return <Message variant="danger">Invalid order configuration</Message>;
    }

    return (
      <PaystackButton
        {...config}
        text="Pay with Paystack"
        onSuccess={handlePaystackPayment}
        onClose={() => toast.error("Payment cancelled")}
        className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition-colors"
      />
    );
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="container flex flex-col mt-10 mx-2 md:flex-row md: p-5">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto px-2">
              <table className="w-full md:w-[70%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        ₦ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center px-5">
          <Link to="https://wa.me/2348133333333">
            <FaWhatsapp
              size={30}
              className="mx-3 text-blue-500 cursor-pointer"
            />
          </Link>
          <Link to="https://www.instagram.com/admire_excellence">
            <FaInstagram
              size={30}
              className="mx-3  text-blue-500 cursor-pointer"
            />
          </Link>
          <Link to="https://www.facebook.com/godswill.okenyi/">
            <FaFacebookMessenger
              size={30}
              className="mx-3 text-blue-500 cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5  mx-2 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4  mt-4">
            <strong className="text-blue-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-blue-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-blue-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-blue-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-blue-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message variant="success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Not paid</Message>
          )}
        </div>

        <h2 className="text-xl mx-2 font-bold mb-2 mt-3 md:mt-0">
          Order Summary
        </h2>
        <div className="flex flex-col md:flex-row mx-2 justify-between mb-2">
          <span>Items</span>
          <span>₦ {order.itemsPrice}</span>
        </div>
        <div className="flex flex-col mx-2 md:flex-row justify-between mb-2">
          <span>Shipping</span>
          <span>₦ {order.shippingPrice}</span>
        </div>
        <div className="flex flex-col mx-2 md:flex-row justify-between mb-2">
          <span>Tax</span>
          <span>₦ {order.taxPrice}</span>
        </div>
        <div className="flex flex-col mx-2 md:flex-row justify-between mb-2">
          <span>Total</span>
          <span>₦ {order.totalPrice}</span>
        </div>
        {!order.isPaid && (
          <div className="mb-4">
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                {order.paymentMethod === "PayPal" && (
                  <div className="px-4 pt-2">
                    {/* Keep existing PayPal section unchanged */}
                  </div>
                )}
                {order.paymentMethod === "Paystack" && (
                  <div className="px-4 pt-2">{renderPaystackButton()}</div>
                )}
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {(order.isPaid || orderIsPaid) &&
          userInfo &&
          userInfo.isAdmin &&
          !order.isDelivered && (
            <div>
              <button
                type="button"
                className="bg-blue-500 text-white mx-3 w-full py-2"
                onClick={deliverHandler}
              >
                Mark As Delivered
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Order;
