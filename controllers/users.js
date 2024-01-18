import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.js";
import passport from "passport";
export const directToRegister = catchAsync(async (req, res) => {
  res.render("users/register");
});

export const submitRegister = catchAsync(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to Acamp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
});

export const directToLogin = catchAsync(async (req, res) => {
  res.render("users/login");
});

export const submitUserLogin = catchAsync(async (req, res, next) => {
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  })(req, res, () => {
    req.flash("success", "Welcome back!");
    res.redirect(redirectUrl);
  });
});

export const userLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/campgrounds");
  });
};
