import Review from "../models/review.js";
import catchAsync from "../utils/catchAsync.js";
import Campground from "../models/campground.js";

export const getReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const newreview = new Review(req.body.review);
  newreview.author = req.user._id;
  campground.reviews.push(newreview);
  await newreview.save();
  await campground.save();
  req.flash("success", "created new review!");
  res.redirect(`/campgrounds/${campground._id}`);
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/campgrounds/${id}`);
});
