const errorHandlerMiddleware = async (err, req, res, next) => {
  // Ensure that the error object has a message property
  const errorMessage = typeof err === "string" ? err : err.message;

  const { statusCode = 500 } = err;

  if (!errorMessage) {
    // If the error doesn't have a message property, provide a default message
    err.message = "Oh no! Something went wrong.";
  }

  // Log the error to the console for debugging
  console.error("Error:", err);

  return res.status(statusCode).render("error", { err: errorMessage });
};

export default errorHandlerMiddleware;
