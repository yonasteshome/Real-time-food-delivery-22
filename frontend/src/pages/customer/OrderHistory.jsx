// src/pages/customer/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { getOrderHistory } from "../../api/customer/orderHistoryApi";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderHistory();
        setOrders(data.data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-20 sm:w-24">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 font-sans">
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Order History</h1>
            <input
              type="text"
              placeholder="Search menu here"
              className="px-4 py-2 border rounded-lg shadow-sm w-72"
            />
          </div>

          <div className="grid grid-cols-5 font-semibold border-b pb-3 mb-3 text-sm text-gray-700">
            <span>Driver Name</span>
            <span>Date</span>
            <span>Item</span>
            <span>Total Price</span>
            <span>Status</span>
          </div>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <Link
                to={`/orders/${order._id}`}
                key={order._id}
                className="block"
              >
                <div className="grid grid-cols-5 items-center py-4 border-b text-sm hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        order.driver?.image || "https://via.placeholder.com/40"
                      }
                      alt="driver"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-red-500 font-semibold">
                        {order.driver?.name || "Unknown Driver"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.driver?.role || "Driver"}
                      </p>
                    </div>
                  </div>
                  <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                  <div>
                    {order.items && order.items.length > 0
                      ? order.items.map((i) => i.name).join(", ")
                      : "No items"}
                  </div>
                  <div>${order.total}</div>
                  <div
                    className={
                      order.status === "pending"
                        ? "text-yellow-600 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {order.status}
                  </div>
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default OrderHistory;
