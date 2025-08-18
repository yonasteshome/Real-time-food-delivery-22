import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    address,
    paymentMethod,
    setAddress,
    setPaymentMethod,
    clearCart,
  } = useStore();

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
        <div className="pointer-events-none absolute -top-10 -right-10 w-1/3 h-1/3 bg-[#FFD700] rounded-full blur-[150px] opacity-20" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-1/3 h-1/3 bg-[#FF0000] rounded-full blur-[150px] opacity-20" />

        <div className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl shadow-lg p-8 text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#FF0000] via-[#FFD700] to-[#FF0000] text-transparent bg-clip-text">
            Your cart is empty
          </h1>
          <p className="text-black/70">Add some items to get started.</p>
        </div>
      </div>
    );

  return (
    <div className="relative bg-white min-h-screen py-10 px-6">
      <div className="pointer-events-none absolute top-0 right-0 w-1/3 h-1/3 bg-[#FFD700] rounded-full blur-[150px] opacity-20" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#FF0000] rounded-full blur-[150px] opacity-20" />

      <div className="relative max-w-2xl mx-auto bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#FF0000] via-[#FFD700] to-[#FF0000] text-transparent bg-clip-text">
          Checkout
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            <span className="underline decoration-[#FF0000]/60 decoration-2 underline-offset-4">
              Address
            </span>
          </h2>
          <div className="group relative bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl p-3 hover:bg-[#FFD700]/10 transition-all duration-300">
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              rows={4}
              className="w-full bg-transparent placeholder-black/40 text-black border-0 focus:outline-none focus:ring-0 resize-y"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            <span className="underline decoration-[#FF0000]/60 decoration-2 underline-offset-4">
              Payment Method
            </span>
          </h2>
          <div className="grid gap-2">
            <label className="flex items-center gap-3 bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl p-3 hover:bg-[#FFD700]/10 transition-all duration-300 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#FF0000] focus:ring-[#FFD700] focus:outline-none"
              />
              <span className="text-black">Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl p-3 hover:bg-[#FFD700]/10 transition-all duration-300 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#FF0000] focus:ring-[#FFD700] focus:outline-none"
              />
              <span className="text-black">Credit/Debit Card (mock)</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-black">
            <span className="underline decoration-[#FF0000]/60 decoration-2 underline-offset-4">
              Order Summary
            </span>
          </h2>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl px-4 py-2 hover:bg-[#FFD700]/10 transition-colors"
              >
                <span className="text-black/80">
                  {item.name}{" "}
                  <span className="text-black/50">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-black">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-extrabold text-black flex items-center justify-between">
            <span>Total</span>
            <span className="bg-gradient-to-r from-[#FF0000] via-[#FFD700] to-[#FF0000] text-transparent bg-clip-text">
              {formatCurrency(total)}
            </span>
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full inline-flex items-center justify-center font-semibold py-3 rounded-xl shadow-md transition-all duration-300 bg-gradient-to-r from-[#FF0000] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FF0000] focus:outline-none focus:ring-4 focus:ring-[#FFD700]/40 active:scale-[0.98]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
