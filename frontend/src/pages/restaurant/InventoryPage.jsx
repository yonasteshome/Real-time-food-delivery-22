import { useEffect } from "react";
import { useInventoryStore } from "../store/restaurant/inventoryStore";

function Inventory() {
  const {
    inventory,
    fetchInventory,
    updateStock,
    markUnavailable,
    loading,
    error,
  } = useInventoryStore();

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleUpdate = (id) => {
    const newQty = prompt("Enter new stock quantity:");
    if (newQty != null && !isNaN(newQty)) {
      updateStock(id, parseInt(newQty, 10));
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black mb-4">
        Inventory Management
      </h1>

      {/* Loading/Error */}
      {loading && <p className="text-black/60">Loading inventory...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-[#FF0000] text-white">
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Available</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.stock}</td>
              <td className="px-4 py-2">{item.available ? "✅" : "❌"}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="bg-[#FF0000] hover:bg-[#FFD700] text-white rounded px-3 py-1 transition-colors duration-300"
                >
                  Update Stock
                </button>
                <button
                  onClick={() => markUnavailable(item.id)}
                  className="bg-gray-400 hover:bg-[#FFD700] text-white rounded px-3 py-1 transition-colors duration-300"
                >
                  Mark Unavailable
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
