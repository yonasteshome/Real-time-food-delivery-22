const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");
const logger = require("../utils/logger");
const { generateToken } = require("../utils/generateToken");
const User = require("../models/Users");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      deleted: false,
      verified: true,
    });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants." });
  }
};

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
    res.status(500).json({ error: "Failed to fetch restaurant." });
  }
};

const addMenuItem = async (req, res) => {
  const { name, price, description, image, inStock } = req.body;

  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (!Array.isArray(restaurant.menu)) {
      restaurant.menu = [];
    }

    restaurant.menu.push({ name, price, description, image, inStock });
    await restaurant.save();

    res.status(201).json({ message: "Menu item added", menu: restaurant.menu });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res
      .status(500)
      .json({ error: "Failed to add menu item", details: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });

    restaurant.menu = restaurant.menu.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    await restaurant.save();

    res.json({ message: "Menu item removed", menu: restaurant.menu });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove menu item" });
  }
};
const updateMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const menuItem = restaurant.menu.id(req.params.itemId);

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    if (req.body.name !== undefined) menuItem.name = req.body.name;
    if (req.body.price !== undefined) menuItem.price = req.body.price;
    if (req.body.description !== undefined)
      menuItem.description = req.body.description;
    if (req.body.image !== undefined) menuItem.image = req.body.image;
    if (req.body.inStock !== undefined) menuItem.inStock = req.body.inStock;

    await restaurant.save();

    res.json({
      success: true,
      updatedItem: menuItem,
    });
  } catch (err) {
    logger.error("Update error:", err);
    res.status(500).json({ error: "Server error during update" });
  }
};
// GET /api/restaurants/:id/menu
const getMenu = async (req, res) => {
  try {
    const id = req.params.id;

    logger.info(id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });

    res.status(200).json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};
const registerRestaurant = async (req, res) => {
  try {
    const { email, phone, password, name, location } = req.body;

    // Check if a user with the same email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    // Create the restaurant user
    const user = await User.create({
      email,
      phone,
      password,
      role: "restaurant",
    });

    console.log("✅ Restaurant user created:", user._id);

    // Create the restaurant entry linked to the user
    const restaurant = await Restaurant.create({
      name,
      location,
      ownerId: user._id,
    });

    res.status(201).json({
      status: "success",
      data: { restaurant },
    });
  } catch (err) {
    console.error(err.message);
    logger.error("Error registering restaurant:", err);
    res.status(500).json({ message: err.message });
  }
};
const pendingRestaurant = async (req, res) => {
  try {
    const pending = await Restaurant.find({ verified: false, deleted: false });
    res.status(200).json({
      status: "success",
      data: { pending },
    });
  } catch (error) {
    console.error("Error fetching pending restaurants:", error);
    logger.error("Error fetching pending restaurants:", error);
    res.status(500).json({ message: "Failed to fetch pending restaurants" });
  }
};

const verifyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.verified = true;
    await restaurant.save();

    res.status(200).json({ message: "Restaurant verified successfully" });
  } catch (error) {
    console.error("Error verifying restaurant:", error);
    logger.error("Error verifying restaurant:", error);
    res.status(500).json({ message: "Failed to verify restaurant" });
  }
};

// Exporting the functions
module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getMenu,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  registerRestaurant,
  pendingRestaurant,
  verifyRestaurant,
};
