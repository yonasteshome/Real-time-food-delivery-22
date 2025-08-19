const mongoose = require("mongoose");
const Joi = require("joi");
const Restaurant = require("../models/Restaurant");
const User = require("../models/Users");
const logger = require("../utils/logger");

const userRoleSchema = Joi.object({
  role: Joi.string()
    .valid("customer", "restaurant", "driver", "admin")
    .optional()
    .messages({
      "string.valid":
        "Role must be one of: customer, admin, restaurant, driver",
    }),
});

const rejectRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { verified: false },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    res.json({ message: "Restaurant rejected successfully", restaurant });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    logger.error("Error verifying restaurant", err.message);
  }
};

const getUserByRoles = async (req, res) => {
  try {
    const { error, value } = userRoleSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }

    const { role } = value;

    const query = role ? { role } : {};
    logger.info(`Fetching users with query: ${JSON.stringify(query)}`);

    const users = await User.find(query).select("-password");
    const count = users.length;

    if (count === 0) {
      return res
        .status(400)
        .json({ message: "No users found for the specified role" });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      data: { count, users },
    });
  } catch (err) {
    logger.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { rejectRestaurant, getUserByRoles };
