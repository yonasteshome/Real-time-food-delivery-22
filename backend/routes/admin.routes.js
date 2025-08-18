const express = require('express')
const router = express.Router();

const {pendingRestaurant, verifyRestaurant} = require("../controllers/admin.controller");

const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");

router.get("/restaurant/pending", protect, restrictTo('admin'), pendingRestaurant);
router.put("/restaurant/verify/:id", protect, restrictTo('admin'), verifyRestaurant);

module.exports = router;

