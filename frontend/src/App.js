import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './pages/customer/Login';
import Signup from "./pages/customer/Signup";
import ForgotPassword from "./pages/customer/ForgotPassword";
import ResetPassword from "./pages/customer/ResetPassword";
import { Landing_Page } from "./pages/customer/Landing Page";
import VerificationCode from "./components/VerificationCode";
import OrderHistory from "./pages/customer/OrderHistory";
import FeedbackPage from "./pages/customer/FeedBack";
import NearbyRestaurants from "./pages/customer/NearbyRestaurants";
import Sidebar from "./components/Sidebar";

import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import Navbar from "./components/Navbar";
import MenuManagement from "./pages/MenuManagementpage";
import Inventory from "./pages/InventoryPage";
import MenuPage from "./pages/customer/MenuPage";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderConfirmationPage from "./pages/customer/OrderConfirmationPage";
import Dashboard from "./pages/restaurant/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white/90">
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerificationCode />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/nearby" element={<NearbyRestaurants />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Restaurant Pages */}
          {/* <Navbar /> */}
          <Route path="/menu/:restaurantId" element={<MenuManagement />} />
          <Route path="/inventory/:restaurantId" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
