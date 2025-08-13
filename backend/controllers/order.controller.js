const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const { client: redisClient } = require("../config/redis");
const logger = require("../utils/logger");

exports.createOrder = async (req, res) => {
  try {
    const { deliveryLocation, paymentMethod } = req.body;
    const cart = await Cart.findOne({ customerId: req.user._id });
    if (!cart)
      return res.status(404).json({ message: "Cart is empty or not found" });

    const restaurant = await Restaurant.findOne({
      id: cart.restaurantId,
      deleted: false,
    });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    for (const item of cart.items) {
      const menuItem = restaurant.menu.id(item.menuItemId);
      if (!menuItem || !menuItem.inStock || menuItem.price !== item.price) {
        return res.status(400).json({
          message: `Menu item ${item.name} is unavailable or price is changed`,
        });
      }
    }

    const order = new Order({
      customerId: req.user._id,
      restaurantId: cart.restaurantId,
      items: cart.items,
      total: cart.total,
      deliveryLocation,
      paymentMethod,
      status: "pending",
    });

    await Order.save();
    await Cart.deleteOne({ customerId: req.user._id }); // clear cart
    await redisClient.del(`cart:${req.user._id}`);
    // await redisClient.del(`orders:${cart.restaurantId}`);
    res.status(200).json({ message: "success", data: order });
  } catch (err) {
    logger.error(`Error creating the order: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
};
