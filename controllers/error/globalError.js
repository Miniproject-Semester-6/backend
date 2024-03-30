const AppError = require("../../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const globalError = (error, req, res, next) => {
  console.log("💥 Error 💥", error);

  let err = { ...error };

  if (error.name === "CastError") err = handleCastErrorDB(err);
  if (error.code === 11000) err = handleDuplicateFieldsDB(err);
  if (error.name === "ValidationError") err = handleValidationErrorDB(err);

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    isOperational: err.isOperational || false,
  });
};

module.exports = globalError;
