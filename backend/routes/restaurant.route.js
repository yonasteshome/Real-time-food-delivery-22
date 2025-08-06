const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getMenu,
} = require("../controllers/restaurant.controller");

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.post("/:restaurantId/menu", addMenuItem);
router.delete("/:restaurantId/menu/:itemId", deleteMenuItem);
router.put("/:restaurantId/menu/:itemId", updateMenuItem);
router.get("/:id/menu", getMenu);
module.exports = router;
