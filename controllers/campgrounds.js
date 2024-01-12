import Campground from "../models/campground.js";

export const getAllCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

export const getCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
};

export const createCampground = async (req, res) => {
  res.render("campgrounds/new");
};

export const postCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
};

export const editCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id);

  res.render(`campgrounds/edit`, { campground });
};
export const saveeditCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
};

export const deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  res.redirect(`/campgrounds`);
};
