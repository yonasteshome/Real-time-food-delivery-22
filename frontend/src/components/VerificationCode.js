import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const VerificationCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";
  const generatedCode = location.state?.generatedCode || "";

  const [code, setCode] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email || !generatedCode) {
      navigate("/signup");
    }
    inputRefs.current[0]?.focus();
  }, [email, generatedCode, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // only digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;

    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || "";
    }
    setCode(newCode);
    inputRefs.current[Math.min(5, pasted.length - 1)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    if (enteredCode === generatedCode) {
      setMessage("Verification successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2500);
    } else {
      setMessage("Invalid code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Verify your Email</h1>
        <p className="text-sm text-gray-600 mb-6">
          We sent a 6-digit verification code to <b>{email}</b>.
        </p>

        <div
          className="flex justify-center gap-3 mb-6"
          onPaste={handlePaste}
        >
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E] transition"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-[#E23E3E] text-white py-2 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Verify
        </button>

        {message && (
          <p
            className={`mt-4 font-medium ${
              message.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 text-sm text-gray-600">
          Didn’t receive a code?{" "}
          <button
            onClick={() => alert("Resend code logic goes here.")}
            className="text-[#E23E3E] underline"
          >
            Resend Code
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          Go back to{" "}
          <Link to="/signup" className="text-[#E23E3E] underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default VerificationCode;
