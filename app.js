import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import methodOverride from "method-override";
import campgroundroutes from "./routes/campRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { seedDB } from "./seeds/index.js";
import ejsMate from "ejs-mate";
import "express-async-errors";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFound from "./middleware/page-not-found.js";
import session from "express-session";
import flash from "connect-flash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

connectDB();
seedDB();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cors());

const sessionConfig = {
  secret: "bettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use("/campgrounds", campgroundroutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.use(errorHandlerMiddleware);
app.use(notFound);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
