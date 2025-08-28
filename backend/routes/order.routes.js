const express = require("express");
const {
  createOrder,
  getOrderHistory,
<<<<<<< HEAD
=======
  changeOrderStatus
>>>>>>> 4710a64c6ea4b66ef80cdaf7fbcb2d4859da27b6
} = require("../controllers/order.controller");
const { validateCreateOrder } = require("../validators/orderValidator");
const protect = require("../middlewares/auth.middleware.js");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

router.post(
  "/",
<<<<<<< HEAD
  // protect,
  // restrictTo("customer", "restaurant", "admin"),
=======
  protect,
  restrictTo("customer", "restaurant", "admin"),
>>>>>>> 4710a64c6ea4b66ef80cdaf7fbcb2d4859da27b6
  validateCreateOrder,
  createOrder
);
router.get(
  "/all",
<<<<<<< HEAD
  // protect,
  // restrictTo("customer", "restaurant", "admin"),
  getOrderHistory
);

module.exports = router;
=======
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
>>>>>>> 4710a64c6ea4b66ef80cdaf7fbcb2d4859da27b6
