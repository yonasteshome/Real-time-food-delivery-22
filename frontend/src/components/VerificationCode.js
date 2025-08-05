import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const VerificationCode = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const { pendingUser } = useAuthStore();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!pendingUser?.phone) {
      navigate("/signup");
    } else {
      inputsRef.current[0]?.focus();
    }
  }, [pendingUser, navigate]);

  const handleChange = (val, idx) => {
    if (!val) return;

    if (!/^\d$/.test(val)) return; // allow only one digit

    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    if (idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(paste)) return; // only proceed if exactly 6 digits

    const digits = paste.split("");
    setCode(digits);

    // Focus last input
    inputsRef.current[5]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      if (code[idx]) {
        newCode[idx] = "";
        setCode(newCode);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        newCode[idx - 1] = "";
        setCode(newCode);
      }
    }
  };

  const allFilled = code.every((digit) => digit !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled) return;

    setStatus("loading");
    setMessage("");
    const otp = code.join("");

    try {
      const res = await fetch("http://localhost:5000/api/delivery/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: pendingUser.phone, otp }),
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
    setMessage("A new code has been sent.");
    setStatus("idle");
    setCode(["", "", "", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <h1 className="text-2xl font-semibold mb-2 text-gray-800 text-center">Verify Your Phone</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter the 6-digit code sent to <span className="font-medium">{pendingUser?.phone}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center gap-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="w-12 h-14 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!allFilled || status === "loading"}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
              status === "success" ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            } text-white disabled:opacity-60`}
          >
            {status === "loading" ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : status === "success" ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : null}
            <span>
              {status === "success" ? "Verified" : status === "loading" ? "Verifying..." : "Verify"}
            </span>
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 flex items-center gap-2 text-sm font-medium ${
              status === "success" ? "text-green-700" : status === "error" ? "text-red-600" : "text-gray-600"
            }`}
          >
            {status === "success" && <span>✅</span>}
            {status === "error" && <span>❌</span>}
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
              Change phone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
