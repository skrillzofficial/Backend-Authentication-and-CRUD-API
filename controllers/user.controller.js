const USER = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

// user registration
const handleRegister = async (req, res, next) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return next(new ErrorResponse("All fields are required", 400));
  }

  try {
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse("Email already exists", 409));
    }

    const user = await USER.create({
      fullName,
      email,
      password,
      role: role || "user",
      isVerified: true,
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(new ErrorResponse("Registration failed", 500));
  }
};

// User login
const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Email and password are required", 400));
  }

  try {
    const user = await USER.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    next(new ErrorResponse("Login failed", 500));
  }
};

// Get all users 
const getAllUsers = async (req, res, next) => {
  try {
    // Excluding passwords and sensitive fields
    const users = await USER.find().select("-password -__v");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(new ErrorResponse("Failed to fetch users", 500));
  }
};

// Delete single user
const deleteUser = async (req, res, next) => {
  try {
    const user = await USER.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(new ErrorResponse("Failed to delete user", 500));
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  getAllUsers,
  deleteUser
};
