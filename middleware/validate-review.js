import { reviewSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  // console.log(result);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
