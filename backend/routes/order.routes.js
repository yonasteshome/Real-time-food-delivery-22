const express = require("express");
const {
  createOrder,
  getOrderHistory,
  changeOrderStatus
} = require("../controllers/order.controller");
const { validateCreateOrder } = require("../validators/orderValidator");
const protect = require("../middlewares/auth.middleware.js");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

router.post(
  "/",
  protect,
  restrictTo("customer", "restaurant", "admin"),
  validateCreateOrder,
  createOrder
);
router.get(
  "/all",
  protect,
  restrictTo("customer", "restaurant", "admin"),
  getOrderHistory
);
router.post(
  "/:orderId/status",
  protect,
  restrictTo("restaurant", "admin"),
  changeOrderStatus
);
module.exports = router;
