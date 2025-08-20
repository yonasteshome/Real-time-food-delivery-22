const express = require("express");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getMenus,
  getMenuItem,
  updateInventory,
  registerRestaurant,
} = require("../controllers/restaurant.controller");

router.post("/register", registerRestaurant);


router.get("/", protect, getAllRestaurants);
router.get("/:id", protect, getRestaurantById);
router.post("/:restaurantId/menu", protect, restrictTo('restaurant'), addMenuItem);
router.delete("/:restaurantId/menu/:itemId", protect, restrictTo('restaurant', 'admin'), deleteMenuItem);
router.put("/:restaurantId/menu/:itemId", protect, restrictTo('restaurant'), updateMenuItem);
router.get("/:restaurantId/menu", protect, getMenus);
router.get("/:restaurantId/menu/:itemId", protect, getMenuItem);
router.put("/:restaurantId/inventory", protect, restrictTo('restaurant'), updateInventory); 

module.exports = router;
