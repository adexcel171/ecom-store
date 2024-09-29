import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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
    <>
      <div className="flex flex-col items-center px-3 mx-auto mt-10">
        {cartItems.length === 0 ? (
          <div className="text-center pt-10 px-2 mb-4">
            Your cart is empty. <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex items-center pt-3 w-full md:w-[400px] lg:w-[500px]">
            <h1 className="text-2xl pt-3 text-center font-semibold mb-4">
              Shopping Cart
            </h1>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 items-center px-3 mb-4 md:mb-6 pb-2"
              >
                <div className="w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[300px] h-[300px] object-cover rounded-md "
                  />
                </div>

                <div className="flex-1 md:ml-4">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-black block mb-2"
                  >
                    {item.name}
                  </Link>

                  <div className="text-black">{item.brand}</div>
                  <div className="mt-2 text-black font-bold">
                    $ {item.price}
                  </div>
                </div>

                <div className="w-24 mt-2 md:mt-0 md:ml-4">
                  <select
                    className="w-full p-1 border rounded text-black"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-2 md:ml-5">
                  <button
                    className="text-blue-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="w-10" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/2">
              <div className="p-4 rounded-lg">
                <h2 className="text-xl text-center font-semibold mb-2 text-black">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>

                <div className="text-2xl text-center font-bold text-black">
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>

                <button
                  className="bg-blue-500 flex items-center justify-center mt-4 py-2 px-4 rounded-full text-lg w-full"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
