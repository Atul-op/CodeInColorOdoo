const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },
    avatar: { type: String }, // Cloudinary image URL

    phone: { type: String }, // optional, can help agent contact
    department: { type: String }, // useful for agents/admin classification
    isActive: { type: Boolean, default: true }, // for blocking/deactivation
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
