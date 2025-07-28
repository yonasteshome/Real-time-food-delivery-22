const mongoose = requre("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  phone: { type: String, unique: true, trim: true },
  password: { type: String, minlength: 8 },
  role: {
    type: String,
    enum: ["customer", "restaurant", "driver", "admin"],
    required: true,
  },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  googleId: { type: String },
  isVerified: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true });
userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
