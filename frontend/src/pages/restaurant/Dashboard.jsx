import React, { useState, useEffect } from "react";
import Sidebar from "../../components/restaurant/Sidebar"; // Ensure correct path

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatBirr = (x) => "Br " + (x || 0).toLocaleString();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/delivery/orders/all", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.data?.orders || []);
    } catch (err) {
      console.error(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (order, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/delivery/orders/${order._id}/status`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      const data = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === order._id ? data.data : o)));
    } catch (err) {
      console.error(err.message);
    }
  };

  const cancelOrder = async (order) => {
    await updateStatus(order, "canceled");
  };

  const nextStatus = (status) => {
    switch (status) {
      case "pending":
        return "accepted";
      case "accepted":
        return "preparing";
      case "preparing":
        return "ready";
      default:
        return null;
    }
  };

  // Compute summary
  const totalOrders = orders.length;
  const statusCounts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with fixed width */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 ml-0 md:ml-0">
        <h1 className="text-2xl font-semibold mb-6">Orders Dashboard</h1>

        {/* Top Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Total Orders</p>
            <p className="text-xl font-bold">{totalOrders}</p>
          </div>
          {["pending", "accepted", "preparing", "ready", "canceled"].map((status) => (
            <div key={status} className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 capitalize">{status}</p>
              <p className="text-xl font-bold">{statusCounts[status] || 0}</p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{order._id}</td>
                    <td className="p-3">{order.customerId?.email || "Unknown"}</td>
                    <td className="p-3">{formatBirr(order.total)}</td>
                    <td className="p-3 capitalize">{order.status}</td>
                    <td className="p-3 flex gap-2">
                      {nextStatus(order.status) && (
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          onClick={() => updateStatus(order, nextStatus(order.status))}
                        >
                          Mark as {nextStatus(order.status)}
                        </button>
                      )}
                      {order.status !== "canceled" && (
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => cancelOrder(order)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
