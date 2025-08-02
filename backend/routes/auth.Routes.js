const express = require("express");
const validate = require("../middlewares/validate");
const {
  registerUserSchema,
  loginSchema,
  otpSchema,
} = require("../validators/userValidator");

const {
  register,
  login,
  verifyOTP,
  refreshToken,
} = require("../controllers/auth.controller");

const router = express.Router();
router.post("/register", validate(registerUserSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/verify-otp", validate(otpSchema), verifyOTP);
router.post("/refresh-token", refreshToken);
module.exports = router;
