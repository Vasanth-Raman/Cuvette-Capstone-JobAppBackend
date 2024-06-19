const globalCatches = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  const isProduction = process.env.IS_PRODUCTION;
  const response = {
    message: err.message || "An unexpected error occurred",
  };

  if (!isProduction) {
    // In development, include the error stack and details for debugging
    response.error = err;
  }

  res.status(500).json(response);
};

module.exports = globalCatches;
