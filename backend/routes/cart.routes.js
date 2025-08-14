const express = require("express");
const {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
} = require("../controllers/cart.controllers");
const {
  validateAddToCart,
  validateUpdateCartItem,
  validateRemoveFromCart,
} = require("../validators/cartValidator");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middleware/restrictTo");

const router = express.Router();

router.post("/", protect, restrictTo("customer"), validateAddToCart, addToCart);
router.put("/:itemId", protect, validateUpdateCartItem, updateCartItem);
router.delete("/:itemId", protect, validateRemoveFromCart, removeFromCart);
router.get("/", protect, getCart);

modules.export = router;
