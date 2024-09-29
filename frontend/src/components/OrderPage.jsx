import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders</p>;

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <div className="flex flex-col space-y-4">
        {orders?.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-sm">
            <h3>Order ID: {order._id}</h3>
            <p>Total: {order.totalPrice}</p>
            <Link to={`/order/${order._id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
