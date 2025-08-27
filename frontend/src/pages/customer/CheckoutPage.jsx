import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/customer/cartStore";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCartStore();

  const [address, setAddress] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("cod");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const formatCurrency = (n) => `$${Number(n || 0).toFixed(2)}`;

  const handlePlaceOrder = () => {
    navigate("/order-confirmation", {
      state: { cartItems, total, address, paymentMethod },
    });
    clearCart();
  };

  if (cartItems.length === 0)
    return (
      <div className="relative min-h-screen bg-white flex items-center justify-center p-6">
        <div className="pointer-events-none absolute -top-10 -right-10 w-1/3 h-1/3 bg-yellow-300 rounded-full filter blur-[150px] opacity-20" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-1/3 h-1/3 bg-red-400 rounded-full filter blur-[150px] opacity-20" />

        <div className="bg-white/60 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-lg p-8 text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-3 text-red-600">
            Your cart is empty
          </h1>
          <p className="text-gray-600">Add some items to get started.</p>
        </div>
      </div>
    );

  return (
    <div className="relative bg-white min-h-screen py-10 px-6">
      <div className="pointer-events-none absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-300 rounded-full filter blur-[150px] opacity-20" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-1/3 h-1/3 bg-red-400 rounded-full filter blur-[150px] opacity-20" />

      <div className="relative max-w-2xl mx-auto bg-white/60 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-red-600">
          Checkout
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Address</h2>
          <div className="group relative bg-gray-100/80 border border-gray-200/80 rounded-xl p-3 hover:bg-yellow-100/60 transition-all duration-300">
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              rows={4}
              className="w-full bg-transparent placeholder-gray-500 text-gray-800 border-0 focus:outline-none focus:ring-0 resize-y"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Payment Method
          </h2>
          <div className="grid gap-2">
            <label className="flex items-center gap-3 bg-gray-100/80 border border-gray-200/80 rounded-xl p-3 hover:bg-yellow-100/60 transition-all duration-300 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-red-600 focus:ring-yellow-500 focus:outline-none"
              />
              <span className="text-gray-800">Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 bg-gray-100/80 border border-gray-200/80 rounded-xl p-3 hover:bg-yellow-100/60 transition-all duration-300 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-red-600 focus:ring-yellow-500 focus:outline-none"
              />
              <span className="text-gray-800">Credit/Debit Card (mock)</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Order Summary
          </h2>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-gray-100/80 border border-gray-200/80 rounded-xl px-4 py-2 hover:bg-yellow-100/60 transition-colors"
              >
                <span className="text-gray-700">
                  {item.name}{" "}
                  <span className="text-gray-500">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-gray-800">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-extrabold text-gray-800 flex items-center justify-between">
            <span>Total</span>
            <span className="text-red-600">{formatCurrency(total)}</span>
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full inline-flex items-center justify-center font-semibold py-3 rounded-xl shadow-md transition-all duration-300 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/40 active:scale-[0.98]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
