import express from "express";
import { validateReview } from "../middleware/validate-review.js";
import { deleteReview, getReviews } from "../controllers/reviews.js";
import { isReviewAuthor } from "../middleware/is-review-author.js";
import { isLoggedIn } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

router.route("/").post(isLoggedIn, validateReview, getReviews);
router.route("/:reviewId").delete(isReviewAuthor, deleteReview);

export default router;
