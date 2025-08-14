const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getMenu,
  registerRestaurant,
  pendingRestaurant,
  verifyRestaurant,
} = require("../controllers/restaurant.controller");

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.post("/:restaurantId/menu", addMenuItem);
router.delete("/:restaurantId/menu/:itemId", deleteMenuItem);
router.put("/:restaurantId/menu/:itemId", updateMenuItem);
router.get("/:restaurantId/menu", getMenu);
router.post("/register", registerRestaurant);
router.get("/admin/pending", pendingRestaurant);
router.put("/admin/verify/:id", verifyRestaurant);

module.exports = router;