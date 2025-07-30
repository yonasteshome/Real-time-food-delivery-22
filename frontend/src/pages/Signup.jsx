import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuthStore from "../store/authStore";

const Signup = () => {
  const [form, setForm] = useState({ email: "", phone: "", password: "" });
  const { signupUser } = useAuthStore();
  const navigate = useNavigate();
  const blurDiv = useRef(null); // Dummy element to capture initial focus

  useEffect(() => {
    if (blurDiv.current) {
      blurDiv.current.focus();
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    await signupUser(form.email, form.phone, form.password);

    alert(`Verification code sent to ${form.email}: ${verificationCode}`);

    navigate(`/verify?email=${encodeURIComponent(form.email)}`, {
      state: { generatedCode: verificationCode },
    });
  };

  return (
    <>
      {/* Dummy hidden focus element */}
      <div
        ref={blurDiv}
        tabIndex={-1}
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
      ></div>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white flex w-full max-w-5xl overflow-hidden">

          {/* Image Section */}
          <div className="hidden md:block w-1/2 pointer-events-none select-none" tabIndex={-1}>
            <img
              src="/pngtree-food-delivery-by-scooters-free-download-png-image_16940462.png"
              alt="Food delivery"
              className="object-cover h-full w-full"
              draggable="false"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-10">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome!</h1>
            <p className="text-sm text-gray-500 mb-6">Register here using the form below</p>

            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">📞</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#E23E3E]" />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#E23E3E] text-white py-2 rounded-xl font-semibold hover:bg-red-400 transition"
              >
                Sign up
              </button>

              <div className="text-center text-gray-400 my-3">or signup with</div>

              <button
                type="button"
                className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <p className="text-sm text-center mt-4 text-gray-600">
                If you have an account?
                <Link to="/login" className="text-[#E23E3E] font-medium hover:underline ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
