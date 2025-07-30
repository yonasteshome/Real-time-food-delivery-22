import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // get token from URL params
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Password reset successful.");
        // Redirect to login after a short delay
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Error resetting password. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow p-8 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#E23E3E] text-white py-2 rounded-xl hover:bg-red-400 transition"
        >
          Reset Password
        </button>

        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
