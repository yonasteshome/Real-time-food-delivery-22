import React from "react";

const orders = new Array(6).fill({
  driver: {
    name: "John snow",
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
      <aside className="w-48 bg-white border-r border-gray-200 p-4">
        <div className="mb-10">
          <img
            src="/pngtree-food-delivery-by-scooters-free-download-png-image_16940462.png"
            alt="Logo"
            className="w-16 mx-auto"
          />
        </div>
        <nav className="space-y-6 text-sm">
          {["Home", "Explore", "Orders", "Promos", "Setting"].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 px-2 hover:text-red-500 cursor-pointer"
            >
              <span>📦</span>
              <span>{item}</span>
            </div>
          ))}
        </nav>
      </aside>

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
          <span>date</span>
          <span>item</span>
          <span>Total Price</span>
          <span>Status</span>
        </div>

        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center py-4 border-b text-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={order.driver.image}
                alt="driver"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-red-500 font-semibold">
                  {order.driver.name}
                </p>
                <p className="text-xs text-gray-500">{order.driver.role}</p>
              </div>
            </div>
            <div>{order.date}</div>
            <div>{order.item}</div>
            <div>{order.total}</div>
            <div className="text-green-600 font-medium">{order.status}</div>
          </div>
        ))}
      </main>
    </div>
  );
}
