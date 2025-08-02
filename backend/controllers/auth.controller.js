const User = require("../models/Users");
const { generateToken, refreshToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const { sendOTP, verifyOTP } = require("../utils/afroMessage");
const { client: redisClient } = require("../config/redis");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const { ref } = require("joi");

exports.register = async (req, res) => {
  try {
    const { email, phone, password, role, restaurantId } = req.body;
    const userExist = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExist)
      return res.status(400).json({ message: "User alreaady exists" });

    const user = await User.create({
      email,
      phone,
      password,
      role,
      restaurantId,
    });

    const { verificationCode, code } = await sendOTP(phone);

    try {
      const result = await redisClient.setEx(
        `otp:${phone}`,
        300,
        JSON.stringify({ code, verificationCode })
      );
      logger.info(`Redis set results: ${result}`);
    } catch (err) {
      logger.error(`Redis set error: ${err.message}`);
    }

    res.status(200).json({
      status: "success",
      data: { userid: user._id, role: user.role },
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const storeData = await redisClient.get(`otp:${phone}`);
    if (!storeData) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    const { code, verificationCode } = JSON.parse(storeData);
    const isvalid = await verifyOTP(phone, verificationCode, otp);
    if (!isvalid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOneAndUpdate(
      { phone },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateToken(user);
    const refreshTokenn = refreshToken(user);
    await User.updateOne({ _id: user._id }, { refreshToken });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", refreshTokenn, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res
      .status(200)
      .json({ status: "success", data: { userID: user._is, role: user.role } });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      const { verificationCode, code } = await sendOTP(user.phone);
      await redisClient.setEx(
        `otp:${user.phone}`,
        300,
        JSON.stringify({ code, verificationCode })
      );
      return res
        .status(403)
        .json({ message: "Please verify your phone number first." });
    }

    const token = generateToken(user);
    const refreshTokenn = refreshToken(user);

    await User.updateOne({ id: user._id }, { refreshToken });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", refreshTokenn, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      status: "success",
      data: { userId: user._id, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token provided" });
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ _id: decoded.id }, { refreshToken });
    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });

    generateToken(user);
    res.status(200).json({
      status: "success",
      data: { userId: user._id, role: user.role },
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Invalid refresh token" });
  }
};
