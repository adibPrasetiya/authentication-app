import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import { SESSION_SECRET } from "../configs/constanta-config.js";
import { fileURLToPath } from "url";
import path from "path";
import { publicRoute } from "../routes/public-route.js";
import expressEjsLayouts from "express-ejs-layouts";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { protectedRoute } from "../routes/protected-route.js";

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/../views"));
app.use(expressEjsLayouts);
app.set("layout", "layout");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/../../public")));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// routes
app.use(publicRoute);
app.use(authMiddleware);
app.use(protectedRoute);
