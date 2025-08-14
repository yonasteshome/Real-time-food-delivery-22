const express = require("express");
const { createOrder } = require("../controllers/OrderController");
const { validateCreateOrder } = require("../validators/orderValidator");
const protect = require("../middleware/auth");
const restrictTo = require("../middleware/restrictTo");

const router = express.Router();

router.post(
  "/",
  protect,
  restrictTo("customer"),
  validateCreateOrder,
  createOrder
);

module.exports = router;
