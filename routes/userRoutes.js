import express from "express";
import {
  directToLogin,
  directToRegister,
  submitRegister,
  submitUserLogin,
  userLogout,
} from "../controllers/users.js";
const router = express.Router({ mergeParams: true });

router.route("/register").get(directToRegister).post(submitRegister);

router.route("/login").get(directToLogin);
router.route("/login").post(submitUserLogin);
router.get("/logout", userLogout);
export default router;
