const express = require("express");
const {
  rejectRestaurant,
  getUserByRoles,
  getAllRestaurants,
  getPlatformStats,
} = require("../controllers/admin.controller");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

router.get("/users", protect, restrictTo("admin"), getUserByRoles);
router.patch(
  "/restaurants/:id/reject",
  protect,
  restrictTo("admin"),
  rejectRestaurant
);
router.get("/restaurants", protect, restrictTo("admin"), getAllRestaurants);
router.get("/stats", protect, restrictTo("admin"), getPlatformStats);

module.exports = router;
