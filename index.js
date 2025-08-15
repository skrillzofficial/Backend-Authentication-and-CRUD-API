require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorHandling");
// Routes
const authRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");

// Initialize Express
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/v1/", authRouter);
app.use("/api/v1/", productRouter);


// Test route
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ status: "success", message: "API is working!" });
});

// Health check
app.get("/", (req, res) => {
  res.send("Server is running. Use Postman to test endpoints.");
});

// 404 Handler (This come after all routes but before errorHandling)
app.use((req, res, next) => {
  res.status(404).json({ status: "fail", message: "Route not found" });
});

// Global error handler (This must be the last middleware)
app.use(errorHandler); // My custom error handling replaces the basic one

// DATABASE & SERVER START
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME || "Internship",
    });
    console.log("MongoDatabase connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
