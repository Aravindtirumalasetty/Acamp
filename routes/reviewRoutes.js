import express from "express";
import { deleteReview, getReviews } from "../controllers/reviews.js";
const router = express.Router({ mergeParams: true });

router.route("/").post(getReviews);
router.route("/:reviewId").delete(deleteReview);

export default router;
