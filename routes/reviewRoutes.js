import express from "express";
import { validateReview } from "../middleware/validate-review.js";
import { deleteReview, getReviews } from "../controllers/reviews.js";
const router = express.Router({ mergeParams: true });

router.route("/").post(validateReview, getReviews);
router.route("/:reviewId").delete(deleteReview);

export default router;
