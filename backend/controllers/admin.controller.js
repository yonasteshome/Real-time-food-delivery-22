const Restaurant = require("../models/Restaurant");

// Admin: Get pending restaurants
const pendingRestaurant = async (req, res) => {
  try {
    const pending = await Restaurant.find({ verified: false, deleted: false });
    res.status(200).json({ status: "success", data: { pending } });
  } catch (error) {
    logger.error("Error fetching pending restaurants:", error);
    res.status(500).json({ message: "Failed to fetch pending restaurants" });
  }
};

// Admin: Verify restaurant
const verifyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    restaurant.verified = true;
    await restaurant.save();

    res.status(200).json({ message: "Restaurant verified successfully" });
  } catch (error) {
    logger.error("Error verifying restaurant:", error);
    res.status(500).json({ message: "Failed to verify restaurant" });
  }
};

module.exports={
    pendingRestaurant,
    verifyRestaurant
};