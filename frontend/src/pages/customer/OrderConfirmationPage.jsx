import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCartStore from "../../store/customer/cartStore";

const currency = (n) => (typeof n === "number" ? n.toFixed(2) : n);

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();

  const { total, address, paymentMethod } = location.state || {};

  const handleFeedback = () => {
    navigate("/feedback");
  };

  const handleSkipFeedback = () => {
    navigate("/ordertracking");
  };

  if (!cartItems || cartItems.length === 0)
    return (
      <p className="text-center text-lg text-black/70 mt-10">No order found.</p>
    );

  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#FFD700] rounded-full blur-[150px] opacity-20" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#FF0000] rounded-full blur-[150px] opacity-20" />

      <div className="relative z-10 py-10 px-6">
        <div className="max-w-2xl mx-auto group bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl shadow-lg p-6 sm:p-8 hover:bg-[#FFD700]/10 transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#FF0000] via-[#FFD700] to-[#FF0000] bg-clip-text text-transparent">
            Order Confirmed! 🎉
          </h1>
          <p className="text-black/70 mb-6">
            Your delicious order is on its way!
          </p>

          <div className="mb-6 space-y-2">
            <p className="text-black">
              <span className="font-semibold text-black">
                Delivery Address:
              </span>{" "}
              <span className="text-black/80">{address || "—"}</span>
            </p>
            <p className="text-black">
              <span className="font-semibold text-black">Payment Method:</span>{" "}
              <span className="text-black/80">{paymentMethod || "—"}</span>
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-[#FF0000]">
              Order Summary
            </h2>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border-b border-black/10 pb-2 text-black"
                >
                  <span className="text-black/80">
                    {item.name}{" "}
                    <span className="text-black/60">× {item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    ${currency(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg font-extrabold">
              Total:{" "}
              <span className="bg-gradient-to-r from-[#FF0000] to-[#FFD700] text-transparent bg-clip-text">
                ${currency(total)}
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleFeedback}
              className="flex-1 inline-flex items-center justify-center font-semibold py-3 rounded-xl shadow-md transition-all duration-200 bg-gradient-to-r from-[#FF0000] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FF0000] text-black"
            >
              Go to Feedback
            </button>
            <button
              onClick={handleSkipFeedback}
              className="flex-1 inline-flex items-center justify-center font-semibold py-3 rounded-xl shadow-md transition-colors duration-200 bg-black/5 border border-black/10 text-black hover:bg-[#FF0000] hover:text-white"
            >
              Skip Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
