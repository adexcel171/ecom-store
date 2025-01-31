import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { FiDollarSign, FiUsers, FiPackage } from "react-icons/fi";

const AdminDashboard = () => {
  // ... keep your existing hooks and state logic ...
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);
  // Updated color scheme
  const primaryColor = "#6366f1"; // Indigo
  const accentColor = "#10b981"; // Emerald
  const backgroundColor = "#f8fafc"; // Light slate

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: new Date(item._id).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          colors: [primaryColor],
          chart: {
            ...prevState.options.chart,
            toolbar: { show: true },
            foreColor: "#64748b",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              columnWidth: "60%",
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.3,
              gradientToColors: [accentColor],
              inverseColors: false,
              opacityFrom: 0.8,
              opacityTo: 0.2,
              stops: [0, 100],
            },
          },
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
            labels: {
              style: {
                colors: "#64748b",
                fontSize: "12px",
              },
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => `₦${value.toFixed(2)}`,
              style: {
                colors: "#64748b",
                fontSize: "12px",
              },
            },
          },
          tooltip: {
            theme: "dark",
            x: {
              formatter: (val) => `Date: ${val}`,
            },
          },
        },
        series: [
          {
            name: "Sales",
            data: formattedSalesDate.map((item) => item.y),
          },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminMenu />

      <div className="p-4 md:p-8 ml-0 md:ml-64">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sales Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Sales</p>
                <h2 className="text-2xl font-bold text-slate-800">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    `₦ ${sales?.totalSales?.toFixed(2)}`
                  )}
                </h2>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <FiDollarSign className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Customers</p>
                <h2 className="text-2xl font-bold text-slate-800">
                  {loading ? <Loader /> : customers?.length}
                </h2>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <FiUsers className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Orders</p>
                <h2 className="text-2xl font-bold text-slate-800">
                  {loadingTwo ? <Loader /> : orders?.totalOrders}
                </h2>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <FiPackage className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Sales Overview
          </h3>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>

        {/* Order List */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Recent Orders
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
