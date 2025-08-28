const express = require("express");
const { getUserFeedback } = require("../controllers/user.controller");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

router.get("/:id/feedback", protect, restrictTo("Customer"), getUserFeedback);

module.exports = router;
