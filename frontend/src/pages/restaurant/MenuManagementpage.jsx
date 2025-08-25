import { useEffect, useState } from "react";
import { useMenuManagementStore } from "../../store/restaurant/MenuManagementStore";

function MenuManagement() {
  const { menuItems, fetchMenu, addMenu, deleteMenu, loading, error } =
    useMenuManagementStore();
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    addMenu(form);
    setForm({ name: "", price: "" });
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-black mb-4">Menu Management</h1>

      {/* Form */}
      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-black/20 rounded p-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border border-black/20 rounded p-2"
        />
        <button
          onClick={handleAdd}
          className="bg-[#FF0000] hover:bg-[#FFD700] text-white rounded px-4 py-2 transition-colors duration-300"
        >
          Add Item
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-black/60">Loading menu...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Menu Table */}
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-[#FF0000] text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">${item.price}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => deleteMenu(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                {/* Edit button can call updateMenu */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuManagement;
