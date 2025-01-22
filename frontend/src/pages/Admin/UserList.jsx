import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>

            {isLoading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                        >
                          NAME
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                        >
                          EMAIL
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                        >
                          ADMIN
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r">
                            <div className="max-w-[100px] truncate">
                              {user._id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border-r">
                            {editableUserId === user._id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={editableUserName}
                                  onChange={(e) =>
                                    setEditableUserName(e.target.value)
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                <button
                                  onClick={() => updateHandler(user._id)}
                                  className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  <FaCheck className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-900">
                                  {user.username}
                                </span>
                                <button
                                  onClick={() =>
                                    toggleEdit(
                                      user._id,
                                      user.username,
                                      user.email
                                    )
                                  }
                                  className="text-gray-400 hover:text-gray-500"
                                >
                                  <FaEdit className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border-r">
                            {editableUserId === user._id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={editableUserEmail}
                                  onChange={(e) =>
                                    setEditableUserEmail(e.target.value)
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                <button
                                  onClick={() => updateHandler(user._id)}
                                  className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  <FaCheck className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <a
                                  href={`mailto:${user.email}`}
                                  className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                  {user.email}
                                </a>
                                <button
                                  onClick={() =>
                                    toggleEdit(
                                      user._id,
                                      user.username,
                                      user.email
                                    )
                                  }
                                  className="text-gray-400 hover:text-gray-500"
                                >
                                  <FaEdit className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r">
                            {user.isAdmin ? (
                              <FaCheck className="h-5 w-5 text-green-500" />
                            ) : (
                              <FaTimes className="h-5 w-5 text-red-500" />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {!user.isAdmin && (
                              <button
                                onClick={() => deleteHandler(user._id)}
                                className="inline-flex items-center p-2 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <FaTrash className="h-4 w-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
