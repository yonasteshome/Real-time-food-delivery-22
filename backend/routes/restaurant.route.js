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
router.post("/:id/menu", addMenuItem);
router.delete("/:id/menu/:itemId", deleteMenuItem);
router.put("/:id/menu/:itemId", updateMenuItem);
router.get("/:id/menu", getMenu);
router.post("/register", registerRestaurant);
router.get("/admin/pending", pendingRestaurant);
router.put("/admin/verify/:id", verifyRestaurant);

module.exports = router;
