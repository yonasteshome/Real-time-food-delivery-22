import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useDriverOrdersStore from "../../store/driver/ordersStore";
import DriverSidebar from "../../components/driver/Sidebar";
import OrderMap from "../../components/driver/OrderMap";

export default function OrderMapPage() {
  const { orderId } = useParams();
  const { orders, loading, error } = useDriverOrdersStore();
  const [order, setOrder] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const foundOrder = orders.find((o) => o._id === orderId);
    setOrder(foundOrder);
  }, [orders, orderId]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDriverLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setLocationError(err.message);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg">Loading order details...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!order) {
    return <div className="text-center mt-20 text-lg">Order not found.</div>;
  }

  const customerLocation = {
    lat: order.deliveryLocation.coordinates[1],
    lng: order.deliveryLocation.coordinates[0],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DriverSidebar />
      <div className="flex-1 ml-20 sm:ml-24 p-6">
        <h2 className="text-3xl font-bold mb-6">Order Delivery Map</h2>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
            <p className="text-gray-600">Status: {order.status}</p>
          </div>
          {locationError && (
            <div className="text-red-500 mb-4">{locationError}</div>
          )}
          <OrderMap
            driverLocation={driverLocation}
            customerLocation={customerLocation}
          />
        </div>
      </div>
    </div>
  );
}
