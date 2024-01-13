import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import methodOverride from "method-override";
import routes from "./routes/campRoutes.js";
import { seedDB } from "./seeds/index.js";
import ejsMate from "ejs-mate";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.engine("ejs", ejsMate);
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cors());

connectDB();
seedDB();

app.set("view engine", "ejs");
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);
app.use("/", routes);
app.get("/", (req, res) => {
  res.render("home");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
