import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Landing_Page } from "./pages/Landing Page";
import VerificationCode from "./components/VerificationCode";
import OrderHistory from "./pages/OrderHistory";
import FeedbackPage from "./pages/FeedBack";
import NearbyRestaurants from './pages/NearbyRestaurants';
import Sidebar from './components/Sidebar';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderDetails from './pages/OrderDetails';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import RestaurantManagement from './pages/RestaurantManagement';
import PendingRestaurants from './pages/PendingRestaurants';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/orders/:id" element={<OrderDetails />} />
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
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<div className="p-6 bg-white rounded-lg shadow">Admin Dashboard Overview</div>} />
          <Route path="users" element={<UserManagement />} />
          <Route path="restaurants" element={<RestaurantManagement />} />
          <Route path="restaurants/pending" element={<PendingRestaurants />} />
          <Route path="settings" element={<div className="p-6 bg-white rounded-lg shadow">Admin Settings</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
