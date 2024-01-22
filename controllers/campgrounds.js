import { cloudinary } from "../cloudinary/index.js";
import Campground from "../models/campground.js";
import catchAsync from "../utils/catchAsync.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding-v6.js";

const mapBoxToken =
  process.env.MAPBOX_TOKEN ||
  "pk.eyJ1IjoiYXJhdmluZDIxMjUiLCJhIjoiY2xyb2lqZ2VpMTRzNDJqcWpkdnI0bDJpbiJ9.-IGKxyD9jzt8AxZGUke-XQ";
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
export const getAllCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

export const getCampground = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Cannot find the campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
});

export const createCampground = catchAsync(async (req, res) => {
  res.render("campgrounds/new");
});
export const postCampground = catchAsync(async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  console.log("camp : ", campground);
  req.flash("success", "successfully made a campground");
  res.redirect(`/campgrounds/${campground._id}`);
});
export const editCampground = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);

  if (!campground) {
    req.flash("error", "Cannot find the campground!");
    return res.redirect("/campgrounds");
  }

  res.render(`campgrounds/edit`, { campground });
});
export const saveeditCampground = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  // const campground = await Campground.findById(id);
  // if (!campground.author.equals(req.user._id)) {
  //   req.flash("error", "You donot have permission to do that !");
  //   return res.redirect(`/campgrounds/${id}`);
  // }
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.images.push(...imgs);
  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
    console.log(campground);
  }
  req.flash("success", "Successfully updated campground!");
  res.redirect(`/campgrounds/${campground._id}`);
});
export const deleteCampground = catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campground!");
  res.redirect(`/campgrounds`);
});
