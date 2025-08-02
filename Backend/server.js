const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); 

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());


const corsOptions = {
  origin: "http://localhost:5174",  
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Default 404 route
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
