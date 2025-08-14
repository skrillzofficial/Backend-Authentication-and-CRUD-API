const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { protect } = require("../middleware/auth");
const { authorizeAdmin } = require("../middleware/adminAuth");

// Routes
router.post("/create", createProduct);
router.get("/all", getAllProducts);

// Routes that involves the use of id
router.get("/single/:id", getProduct);
router.patch("/update/:id", updateProduct);
router.delete("/products/:id", protect, authorizeAdmin, deleteProduct);
module.exports = router;
