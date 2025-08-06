const Restaurant = require("../models/Restaurant");


const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ deleted: false, verified: true });
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
// POST /api/restaurants/:id/menu
const addMenuItem = async (req, res) => {
  const { name, price, description, image, inStock } = req.body;

  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    restaurant.menu.push({ name, price, description, image, inStock });
    await restaurant.save();

    res.status(201).json({ message: "Menu item added", menu: restaurant.menu });
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
};
// DELETE /api/restaurants/:restaurantId/menu/:itemId
const deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

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
  const { name, price, description, image, inStock } = req.body;

  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    const menuItem = restaurant.menu.id(req.params.itemId);
    if (!menuItem) return res.status(404).json({ error: "Menu item not found" });

    menuItem.name = name || menuItem.name;
    menuItem.price = price || menuItem.price;
    menuItem.description = description || menuItem.description;
    menuItem.image = image || menuItem.image;
    menuItem.inStock = inStock !== undefined ? inStock : menuItem.inStock;

    await restaurant.save();

    res.json({ message: "Menu item updated", menu: restaurant.menu });
  } catch (err) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
};
// GET /api/restaurants/:id/menu
const getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    res.status(200).json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
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
};
