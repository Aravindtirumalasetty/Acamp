import express from "express";
const router = express.Router();
import {
  createCampground,
  deleteCampground,
  editCampground,
  getAllCampgrounds,
  getCampground,
  postCampground,
  saveeditCampground,
} from "../controllers/campgrounds.js";
import { storage } from "../cloudinary/index.js";
import { validateCampGround } from "../middleware/validate-campground.js";
import { isLoggedIn } from "../middleware/auth.js";
import { isAuthor } from "../middleware/author.js";
import multer from "multer";
const upload = multer({ storage });

router.route("/").get(getAllCampgrounds);
router
  .route("/")
  .post(isLoggedIn, upload.array("image"), validateCampGround, postCampground);

router.route("/new").get(isLoggedIn, createCampground);
router
  .route("/:id")
  .get(getCampground)
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampGround,
    saveeditCampground
  )
  .delete(isLoggedIn, deleteCampground);
router.route("/:id/edit").get(isAuthor, isLoggedIn, editCampground);

export default router;
