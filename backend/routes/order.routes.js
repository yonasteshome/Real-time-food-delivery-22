const express = require("express");
const {
  createOrder,
  getOrderHistory,
} = require("../controllers/order.controller");
const { validateCreateOrder } = require("../validators/orderValidator");
const protect = require("../middlewares/auth.middleware.js");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

router.post(
  "/",
  // protect,
  // restrictTo("customer", "restaurant", "admin"),
  validateCreateOrder,
  createOrder
);
router.get(
  "/all",
  // protect,
  // restrictTo("customer", "restaurant", "admin"),
  getOrderHistory
);

module.exports = router;