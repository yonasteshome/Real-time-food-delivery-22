const Cart = require("../models/Cart");
const Restaurant = require("../models/Restaurant");
const { checkCache } = require("../utils/cache");
const { client: redisClient } = require("../config/redis");
const logger = require("../utils/logger");

exports.addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity, restaurantId } = req.body;
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      delete: false,
    });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    const menuItem = restaurant.menu.id(menuItemId);
    if (!menuItem || !menuItem.inStock)
      return res
        .status(404)
        .json({ message: "Menu item not found or unavailable" });

    let cart = await Cart.findOne({ customerID: req.user._id, restaurantId });
    if (!cart) {
      cart = new Cart({
        customerId: req.user._id,
        restaurantId,
        items: [],
        total: 0,
      });
    } else if (cart.restaurantId.toString() !== restaurantId) {
      return res
        .status(400)
        .json({ message: "Cart can only contain items from one restaurant" });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
      });
    }

    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    await redisClient.del(`cart:${req.user._id}`);

    res.status(201).json({ message: "success", data: cart });
  } catch (err) {
    logger.error(`Error adding to cart: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ customerId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.quantity = quantity;
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await cart.save();
    await redisClient.del(`cart:${req.user._id}`);
    res.status(200).json({ message: "success", data: cart });
  } catch (err) {
    logger.error(`Error updating cart item: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ customerId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404), json({ message: "Cart item not found" });

    cart.items.pull(itemId);
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    await redisClient.del(`cart:${req.user._id}`);
    res.status(200).json({ message: "success", data: cart });
  } catch (err) {
    logger.error(`Error removing item from cart: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cacheKey = `cart:${res.user._id}`;
    const cached = await checkCache(cacheKey);
    if (cached) {
      return res.status(200).json({ message: "success", data: cached });
    }

    const cart = await Cart.findOne({ customerId: req.user._id }).populate(
      "restaurantId",
      "name"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    await redisClient.setEx(cacheKey, 300, JSON.stringify(cart));
    res.status(200).json({ message: "success", data: cart });
  } catch (err) {
    logger.error(`Error fetching cart: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
};
