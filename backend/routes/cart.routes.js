const express = require("express");
const {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
  deleteCart,
} = require("../controllers/cart.controllers");
const {
  validateAddToCart,
  validateUpdateCartItem,
  validateRemoveFromCart,
} = require("../validators/cartValidator");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

router.post("/", protect, restrictTo("customer"), validateAddToCart, addToCart);
router.put("/:id", protect, validateUpdateCartItem, updateCartItem);
router.delete("/:restaurantId", protect, deleteCart);
router.delete("/:id", protect, removeFromCart);
router.get("/", protect, getCart);

module.exports = router;
