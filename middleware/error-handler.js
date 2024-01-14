const errorHandlerMiddleware = async (err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "oh no! something went wrong";
  }
  return res.status(statusCode).render("error", { err });
};

export default errorHandlerMiddleware;
