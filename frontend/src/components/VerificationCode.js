import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const VerificationCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email and code from location state or query params (simulate)
  // For demo, we get email from query and generatedCode from state
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  // In real app, you wouldn't pass code via frontend like this
  // But here we simulate by passing generatedCode in location.state
  const generatedCode = location.state?.generatedCode || "";

  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email || !generatedCode) {
      // if no email or code, redirect to signup
      navigate("/signup");
    }
  }, [email, generatedCode, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCode === generatedCode) {
      setMessage("Verification successful! You can now login.");
      // Optionally redirect to login after delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setMessage("Invalid code, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Verify your Email
        </h2>

        <p className="mb-4 text-center text-gray-600">
          We sent a verification code to <strong>{email}</strong>. Please enter
          it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Verification code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#E23E3E] text-white py-2 rounded-xl font-semibold hover:bg-red-400 transition"
          >
            Verify
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Didn't receive a code?{" "}
          <button
            onClick={() => alert("Resend code logic here")}
            className="text-[#E23E3E] underline cursor-pointer"
          >
            Resend Code
          </button>
        </p>

        <p className="mt-4 text-center text-sm text-gray-600">
          Go back to{" "}
          <Link to="/signup" className="text-[#E23E3E] underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerificationCode;
