import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";
import cookieParser from "cookie-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the view engine and the views directory
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
// app.set(express.static("public"));
app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.static("public"));
app.use(cookieParser());

app.use(express.json());
app.use(urlencoded({ extended: false }));
// Other configurations and routes...
import staticRoutes from "./routes/static.routes.js";
app.use("/", staticRoutes);

// courses routes...
import coursesRoutes from "./routes/courses.routes.js";
app.use("/courses", coursesRoutes);

//user post routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);

// Student-corner routes
import studentCornerRoutes from "./routes/studentcorner.routes.js";
app.use("/student-corner", studentCornerRoutes);

// Admin routes
import adminRoutes from "./routes/admin.routes.js";
app.use("/admin", adminRoutes);

//testing routes
import sendEmail from "./utils/sendEmail.js";
app.get("/test", async (req, res) => {
  // console.log(req.ip);
  // res.render("test");
  const eRes = await sendEmail(
    "rajajigar222@gmail.com",
    "Verification Email",
    "This is a test of verification email"
  );
  console.log("eRes", eRes);
  console.log("eRes Response", eRes.response);
  res.send("Message Sent Successfully");
});

const PORT = process.env.PORT || 8000;

// connection with database
import connectDB from "./db/connectDB.js";
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(`Error while connectiong to database`, error));
