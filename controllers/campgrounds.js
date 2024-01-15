import { validateCampGround } from "../middleware/validate-campground.js";
import { validateReview } from "../middleware/validate-review.js";
import campground from "../models/campground.js";
import Campground from "../models/campground.js";
import review from "../models/review.js";
import Review from "../models/review.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

export const getCampground = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate(
    "reviews"
  );
  res.render("campgrounds/show", { campground });
});

export const createCampground = catchAsync(async (req, res) => {
  res.render("campgrounds/new");
});

export const postCampground = catchAsync(async (req, res, next) => {
  // if (!req.body.campground) throw new ExpressError("invalid data", 400);

  validateCampGround(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  });
});

export const editCampground = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);

  res.render(`campgrounds/edit`, { campground });
});
export const saveeditCampground = catchAsync(async (req, res) => {
  const { id } = req.params;
  validateCampGround(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  });
});
export const deleteCampground = catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  res.redirect(`/campgrounds`);
});

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
    res.redirect(`/campgrounds/${campground._id}`);
  });
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/ campgrounds/${id}`);
});
