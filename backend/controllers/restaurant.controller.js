const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const logger = require("../utils/logger");
const User = require("../models/Users");

// Helper to check ownership
const checkOwnership = (restaurant, user) => {
  if (!restaurant.ownerId.equals(user._id)) {
    return false;
  }
  return true;
};

// Get all verified, non-deleted restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ deleted: false, verified: true });
    res.status(200).json(restaurants);
  } catch (err) {
    logger.error("Failed to fetch restaurants:", err);
    res.status(500).json({ error: "Failed to fetch restaurants." });
  }
};

// Get single restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
      deleted: false,
      verified: true,
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    res.status(200).json(restaurant);
  } catch (err) {
    logger.error("Failed to fetch restaurant:", err);
    res.status(500).json({ error: "Failed to fetch restaurant." });
  }
};

// Add menu item
const addMenuItem = async (req, res) => {
  try {
    const { name, price, description, image, inStock } = req.body;

    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    if (!checkOwnership(restaurant, req.user)) {
      return res.status(403).json({ error: "Forbidden: You are not the owner" });
    }

    if (!Array.isArray(restaurant.menu)) restaurant.menu = [];

    restaurant.menu.push({ name, price, description, image, inStock });
    await restaurant.save();

    res.status(201).json({ message: "Menu item added", menu: restaurant.menu });
  } catch (error) {
    logger.error("Error adding menu item:", error);
    res.status(500).json({ error: "Failed to add menu item", details: error.message });
  }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    if (req.user.role !== "admin" && !checkOwnership(restaurant, req.user)) {
      return res.status(403).json({ error: "Forbidden: You are not the owner" });
    }

    restaurant.menu = restaurant.menu.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await restaurant.save();
    res.json({ message: "Menu item removed", menu: restaurant.menu });
  } catch (err) {
    logger.error("Failed to remove menu item:", err);
    res.status(500).json({ error: "Failed to remove menu item" });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    if (!checkOwnership(restaurant, req.user)) {
      return res.status(403).json({ error: "Forbidden: You are not the owner" });
    }

    const menuItem = restaurant.menu.id(req.params.itemId);
    if (!menuItem) return res.status(404).json({ error: "Menu item not found" });

    const { name, price, description, image, inStock } = req.body;
    if (name !== undefined) menuItem.name = name;
    if (price !== undefined) menuItem.price = price;
    if (description !== undefined) menuItem.description = description;
    if (image !== undefined) menuItem.image = image;
    if (inStock !== undefined) menuItem.inStock = inStock;

    await restaurant.save();
    res.json({ success: true, updatedItem: menuItem });
  } catch (err) {
    logger.error("Update error:", err);
    res.status(500).json({ error: "Server error during update" });
  }
};

// Get restaurant menu
const getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    res.status(200).json(restaurant.menu);
  } catch (err) {
    logger.error("Failed to fetch menu:", err);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};

// Register restaurant (creates user + restaurant)
const registerRestaurant = async (req, res) => {
  try {
    const { email, phone, password, name, location } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "Restaurant already exists" });

    const user = await User.create({ email, phone, password, role: "restaurant" });
    logger.info("Restaurant user created:", user._id);

    const restaurant = await Restaurant.create({ name, location, ownerId: user._id });

    res.status(201).json({ status: "success", data: { restaurant } });
  } catch (err) {
    logger.error("Error registering restaurant:", err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getMenu,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  registerRestaurant,
};
