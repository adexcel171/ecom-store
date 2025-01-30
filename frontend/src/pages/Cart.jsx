import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center pt-12">
            <div className="inline-block bg-purple-100 p-6 rounded-full mb-6">
              <FaShoppingBag className="text-6xl text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h2>
            <Link
              to="/shop"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <FaShoppingBag className="mr-3 text-purple-600" />
              Shopping Cart
            </h1>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Cart Items */}
              <div className="md:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center gap-6 p-4 border-b hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-lg font-medium text-gray-900 hover:text-purple-600"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600 mt-1">{item.brand}</p>
                      <p className="text-xl font-bold text-purple-600 mt-2">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FaTrash className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-6 h-fit">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Items (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    </span>
                    <span className="font-medium">
                      {formatCurrency(
                        cartItems.reduce(
                          (acc, item) => acc + item.qty * item.price,
                          0
                        )
                      )}
                    </span>
                  </div>

                  <button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                      cartItems.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                    }`}
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/shop"
                    className="inline-block w-full text-center text-purple-600 hover:text-purple-700 font-medium mt-4"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
