import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="container mx-auto">
          <AdminMenu />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-semibold border">ITEMS</th>
                  <th className="p-3 text-left font-semibold border">ID</th>
                  <th className="p-3 text-left font-semibold border">USER</th>
                  <th className="p-3 text-left font-semibold border">DATE</th>
                  <th className="p-3 text-left font-semibold border">TOTAL</th>
                  <th className="p-3 text-left font-semibold border">PAID</th>
                  <th className="p-3 text-left font-semibold border">
                    DELIVERED
                  </th>
                  <th className="p-3 text-left font-semibold border">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <div className="max-w-[100px] overflow-hidden text-ellipsis">
                        {order._id}
                      </div>
                    </td>
                    <td className="p-3 border">
                      {order.user ? order.user.username : "N/A"}
                    </td>
                    <td className="p-3 border">
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : "N/A"}
                    </td>
                    <td className="p-3 border">₦ {order.totalPrice}</td>
                    <td className="p-3 border">
                      {order.isPaid ? (
                        <span className="px-3 py-1 text-sm text-center bg-green-100 text-green-800 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-sm text-center bg-red-100 text-red-800 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3 border">
                      {order.isDelivered ? (
                        <span className="px-3 py-1 text-sm text-center bg-green-100 text-green-800 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-sm text-center bg-red-100 text-red-800 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3 border">
                      <Link
                        to={`/order/${order._id}`}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
