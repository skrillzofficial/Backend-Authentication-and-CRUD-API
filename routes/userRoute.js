const router = require("express").Router();
const {
  handleRegister,
  handleLogin,
  getAllUsers,
  deleteUser,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth");
const { authorizeAdmin } = require("../middleware/adminAuth");

// Public routes
router.post("/register", handleRegister);
router.post("/login", handleLogin);

// Admin-protected routes
router.get("/users", protect, authorizeAdmin, getAllUsers);
// Admin-protected routes that involves use of Id
router.delete("/users/:id", protect, authorizeAdmin, deleteUser);

module.exports = router;
