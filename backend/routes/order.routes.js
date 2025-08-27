const express = require("express");
const {
  createOrder,
  getOrderHistory,
  changeOrderStatus,
  storeFeedback,
} = require("../controllers/order.controller");
const {
  validateCreateOrder,
  validateFeedback,
} = require("../validators/orderValidator");
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
router.post(
  "/:id/feedback",
  protect,
  restrictTo("customer"),
  validateFeedback,
  storeFeedback
);
module.exports = router;
