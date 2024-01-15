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
const router = express.Router();

router.route("/").get(getAllCampgrounds);
router.route("/").post(postCampground);
router.route("/new").get(createCampground);
router
  .route("/:id")
  .get(getCampground)
  .put(saveeditCampground)
  .delete(deleteCampground);
router.route("/:id/edit").get(editCampground);

export default router;
