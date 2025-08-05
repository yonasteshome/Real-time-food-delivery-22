import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/delivery/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setMessage("✅ OTP sent to your phone.");
        setTimeout(() => {
          navigate("/reset-password", { state: { phone } });
        }, 1000);
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md text-center">
        {/* Emoji Icon */}
        <div className="text-4xl text-red-600 mb-4">📱</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h2>
        <p className="text-gray-500 mb-6">
          Enter your email and phone number to receive an OTP.
        </p>

        <form onSubmit={handleSendOTP} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              placeholder="+2519XXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Send OTP
          </button>

          {/* Messages */}
          {message && <p className="text-green-600 text-sm text-center mt-2">{message}</p>}
          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
