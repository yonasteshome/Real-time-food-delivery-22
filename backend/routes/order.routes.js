const express = require("express");
const { createOrder, getOrdersByRestaurant } = require("../controllers/order.controller");
const { validateCreateOrder } = require("../validators/orderValidator");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

router.post(
  "/",
  protect,
  restrictTo("customer","restaurant","admin"),
  validateCreateOrder,
  createOrder
);
router.get("/:restaurantId/order", protect, restrictTo("customer", "restaurant", "admin"), getOrdersByRestaurant);
module.exports = router;
