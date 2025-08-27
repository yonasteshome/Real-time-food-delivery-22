import React from "react";
import Sidebar from "../../components/Sidebar";

const orders = new Array(6).fill({
  driver: {
    name: "John Snow",
    role: "Driver",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  date: "July 21 2025",
  item: "Special burger (2x)",
  total: "$11.98",
  status: "Successful",
});

export default function OrderHistory() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-28 bg-white border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 ">
        <div className="flex justify-between items-center mb-8 pt-6 pr-6">
          <h1 className="text-2xl font-bold">Order History</h1>
          <input
            type="text"
            placeholder="Search menu here"
            className="px-4 py-2 border rounded-lg shadow-sm w-72"
          />
        </div>

        {/* Table header */}
        <div className="grid grid-cols-5 font-semibold border-b pb-3 mb-3 text-sm text-gray-700 pr-6">
          <span>Driver Name</span>
          <span>Date</span>
          <span>Item</span>
          <span>Total Price</span>
          <span>Status</span>
        </div>

        {/* Orders list */}
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center py-4 border-b text-sm pr-6"
          >
            <div className="flex items-center gap-3">
              <img
                src={order.driver.image}
                alt="driver"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-red-500 font-semibold">{order.driver.name}</p>
                <p className="text-xs text-gray-500">{order.driver.role}</p>
              </div>
            </div>
          </div>
        ))}
        </main>
      </div>
    
  );
}
