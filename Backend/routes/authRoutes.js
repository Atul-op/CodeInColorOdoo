const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const upload = require("../middleware/upload");

// 👤 Register user with optional avatar upload
router.post("/register", upload.single("avatar"), register);

// 🔐 Login
router.post("/login", login);

// 🚪 (Optional) Logout route 
router.post("/logout", (req, res) => {

  res.status(200).json({ msg: "Logout successful" });
});

module.exports = router;
