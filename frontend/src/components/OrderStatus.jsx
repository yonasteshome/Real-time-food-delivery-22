import React from "react";
import {
  FiClock,
  FiCheckCircle,
  FiShoppingBag,
  FiLoader,
  FiUser,
} from "react-icons/fi";

export default function OrderStatus({ orders, grouped, setModalOrder, formatBirr }) {
  return (
    <div className="px-4 py-3 bg-gray-50 min-h-screen">
      {/* Header */}
     

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <FiShoppingBag className="text-blue-500 text-2xl mb-1" />
          <h4 className="text-gray-500 text-xs">Total</h4>
          <div className="text-lg font-bold">{orders.length}</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <FiClock className="text-yellow-500 text-2xl mb-1" />
          <h4 className="text-gray-500 text-xs">Pending</h4>
          <div className="text-lg font-bold">{grouped.pending.length}</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <FiLoader className="text-indigo-500 text-2xl mb-1" />
          <h4 className="text-gray-500 text-xs">Preparing</h4>
          <div className="text-lg font-bold">{grouped["in-progress"].length}</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <FiCheckCircle className="text-green-500 text-2xl mb-1" />
          <h4 className="text-gray-500 text-xs">Completed</h4>
          <div className="text-lg font-bold">{grouped.completed.length}</div>
        </div>
      </div>

      {/* Orders Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {["pending", "in-progress", "completed"].map((status) => (
          <div key={status} className="bg-white p-4 rounded-lg shadow">
            <h3 className="mb-3 font-medium text-base border-b pb-1 flex items-center gap-2">
              {status === "pending" ? (
                <>
                  <FiClock className="text-yellow-500" /> Pending
                </>
              ) : status === "in-progress" ? (
                <>
                  <FiLoader className="text-indigo-500" /> Preparing
                </>
              ) : (
                <>
                  <FiCheckCircle className="text-green-500" /> Completed
                </>
              )}
            </h3>

            <div className="space-y-3">
              {grouped[status].map((o) => (
                <div
                  key={o.id}
                  className="bg-gray-50 rounded-md p-3 shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => setModalOrder(o)}
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <FiUser className="text-gray-400" />
                      <span className="font-medium text-gray-800 text-sm">
                        {o.customer}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium bg-gray-200 px-2 py-0.5 rounded">
                      #{o.id}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="text-xs text-gray-600 mb-1">
                    {o.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {i.qty}× {i.name}
                        </span>
                        <span>{formatBirr(i.qty * i.price)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="text-right font-semibold text-sm text-gray-800">
                    Total: {formatBirr(o.total)}
                  </div>
                </div>
              ))}

              {grouped[status].length === 0 && (
                <p className="text-gray-400 text-xs italic">
                  No {status} orders
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
