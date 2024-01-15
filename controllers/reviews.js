import { validateReview } from "../middleware/validate-review.js";
import Review from "../models/review.js";
import catchAsync from "../utils/catchAsync.js";
import Campground from "../models/campground.js";

export const getReviews = catchAsync(async (req, res) => {
  validateReview(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const newreview = new Review(req.body.review);
    campground.reviews.push(newreview);
    await newreview.save();
    await campground.save();
    req.flash("success", "created new review!");
    res.redirect(`/campgrounds/${campground._id}`);
  });
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/ campgrounds/${id}`);
});
