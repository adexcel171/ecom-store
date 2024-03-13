import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

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
      navigate(`/order/&#x20a6;{res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="container  px-2 mx-auto mt-10">
  <ProgressSteps step1 step2 step3 />

  {cart.cartItems.length === 0 ? (
    <Message>Your cart is empty</Message>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left align-top">Image</th>
            <th className="px-2 py-2 text-left">Product</th>
            <th className="px-2 py-2 text-left">Quantity</th>
            <th className="px-2 py-2 text-left">Price</th>
            <th className="px-2 py-2 text-left">Total</th>
          </tr>
        </thead>

        <tbody>
          {cart.cartItems.map((item, index) => (
            <tr key={index}>
              <td className="p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
              </td>

              <td className="p-2">
                <Link to={`/product/&#x20a6;{item.product}`}>{item.name}</Link>
              </td>
              <td className="p-2">{item.qty}</td>
              <td className="p-2">{item.price.toFixed(2)}</td>
              <td className="p-2">&#x20a6;{(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  <div className="mt-8 px-2">
    <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
    <div className="flex flex-col md:flex-row justify-between p-4 bg-[#eceaea]">
      <ul className="text-lg mb-4 md:mb-0 md:mr-8">
        <li>
          <span className="font-semibold mb-3">Items:</span> &#x20a6;{cart.itemsPrice}
        </li>
        <li>
          <span className="font-semibold mb-3">Shipping:</span> &#x20a6;{cart.shippingPrice}
        </li>
        <li>
          <span className="font-semibold mb-3">Tax:</span> &#x20a6;{cart.taxPrice}
        </li>
        <li>
          <span className="font-semibold mb-3">Total:</span> &#x20a6;{cart.totalPrice}
        </li>
      </ul>

      {error && <Message variant="danger">{error.data.message}</Message>}

      <div className="mb-4 md:w-1/3">
        <h2 className="text-2xl font-semibold mb-2">Shipping</h2>
        <p>
          <strong>Address:</strong> {cart.shippingAddress.address},{" "}
          {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
          {cart.shippingAddress.country}
        </p>
      </div>

      <div className="mb-4 md:w-1/3">
        <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
        <strong>Method:</strong> {cart.paymentMethod}
      </div>
    </div>

    <button
      type="button"
      className="bg-teal-500 text-white py-3 item-center px-4 rounded-full text-lg w-[300px] mt-5"
      disabled={cart.cartItems === 0}
      onClick={placeOrderHandler}
    >
      Place Order
    </button>

    {isLoading && <Loader />}
  </div>
</div>

    </>
  );
};

export default PlaceOrder;
