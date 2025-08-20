const express = require("express");
const {
  rejectRestaurant,
  getUserByRoles,
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

module.exports = router;
