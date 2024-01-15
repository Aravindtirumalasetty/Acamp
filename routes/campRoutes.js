import express from "express";
import {
  createCampground,
  deleteCampground,
  deleteReview,
  editCampground,
  getAllCampgrounds,
  getCampground,
  getReviews,
  postCampground,
  saveeditCampground,
} from "../controllers/campgrounds.js";
const router = express.Router();

router.route("/campgrounds").get(getAllCampgrounds);
router.route("/campgrounds").post(postCampground);
router.route("/campgrounds/new").get(createCampground);
router
  .route("/campgrounds/:id")
  .get(getCampground)
  .put(saveeditCampground)
  .delete(deleteCampground);
router.route("/campgrounds/:id/edit").get(editCampground);
router.route("/campgrounds/:id/reviews").post(getReviews);
router.route("/campgrounds/:id/reviews/:reviewId").delete(deleteReview);

export default router;
