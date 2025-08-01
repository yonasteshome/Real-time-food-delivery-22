// VerificationCode.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCode = code.join("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: enteredCode }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Verification successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Invalid code. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Email</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex justify-center gap-2 mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Verify
          </button>
        </form>

        {message && <p className="text-center text-red-600 mt-4">{message}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-2">OR</p>
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => alert("Google Sign-In will be added later.")}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
