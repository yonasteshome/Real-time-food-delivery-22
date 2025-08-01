// VerificationCode.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
      return;
    }
    inputsRef.current[0]?.focus();
  }, [email, navigate]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return; // only digits 0-9, max one
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    if (val && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      const newCode = [...code];
      newCode[idx - 1] = "";
      setCode(newCode);
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const allFilled = code.every((d) => d !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled) return;
    setStatus("loading");
    setMessage("");
    const enteredCode = code.join("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: enteredCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Verification successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setStatus("error");
        setMessage(data.message || "Invalid code. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const handleResend = () => {
    // Placeholder: implement resend logic (call backend to regenerate/send code)
    setMessage("A new code has been sent."); 
    setStatus("idle");
    setCode(["", "", "", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <h1 className="text-2xl font-semibold mb-2 text-gray-800 text-center">Verify Your Email</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter the 6-digit code sent to <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center gap-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="w-12 h-14 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                aria-label={`Digit ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!allFilled || status === "loading"}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
              status === "success"
                ? "bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white disabled:opacity-60`}
          >
            {status === "loading" ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : status === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : null}
            <span>
              {status === "success"
                ? "Verified"
                : status === "loading"
                ? "Verifying..."
                : "Verify"}
            </span>
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 flex items-center gap-2 text-sm font-medium ${
              status === "success"
                ? "text-green-700"
                : status === "error"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {status === "success" && (
              <span aria-label="success" className="inline-block">
                ✅
              </span>
            )}
            {status === "error" && (
              <span aria-label="error" className="inline-block">
                ❌
              </span>
            )}
            <span>{message}</span>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500 flex justify-between items-center">
          <div>
            Didn’t receive a code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-600 font-medium hover:underline"
              disabled={status === "loading"}
            >
              Resend
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-gray-600 hover:underline"
            >
              Change email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
