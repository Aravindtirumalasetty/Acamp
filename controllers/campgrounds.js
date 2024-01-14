import { validateCampGround } from "../middleware/validate-campground.js";
import Campground from "../models/campground.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

export const getCampground = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
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
