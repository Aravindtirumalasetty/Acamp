import express from "express";
import {
  createCampground,
  deleteCampground,
  editCampground,
  getAllCampgrounds,
  getCampground,
  postCampground,
  saveeditCampground,
} from "../controllers/campgrounds.js";
import { validateCampGround } from "../middleware/validate-campground.js";
import { isLoggedIn } from "../middleware/auth.js";
const router = express.Router();

router.route("/").get(getAllCampgrounds);
router.route("/").post(validateCampGround, isLoggedIn, postCampground);
router.route("/new").get(isLoggedIn, createCampground);
router
  .route("/:id")
  .get(getCampground)
  .put(validateCampGround, saveeditCampground)
  .delete(isLoggedIn, deleteCampground);
router.route("/:id/edit").get(isLoggedIn, editCampground);

export default router;
