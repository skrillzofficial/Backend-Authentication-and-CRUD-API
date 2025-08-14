const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // Log error to console for developer
  console.error(`Error: ${err.message}`.red);
  console.error(err.stack);

  // Make a copy of the error
  let error = { ...err };
  error.message = err.message;

  // Handle specific error types
  // Mongoose bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key (MongoError code 11000)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new ErrorResponse(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token has expired';
    error = new ErrorResponse(message, 401);
  }

  // Send response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? {
      stack: err.stack,
      fullError: err
    } : undefined
  });
};

module.exports = errorHandler;