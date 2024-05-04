import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Pinnacle Group – Pinnacle Institute of  Management & Commerce",
  });
});

router.get("/about-us", (req, res) => {
  res.render("pages/about", { title: "About Page" });
});

router.get("/contact-us", (req, res) => {
  res.render("pages/contact", { title: "Contact Us" });
});

router.get("/addmissions", (req, res) => {
  res.render("pages/addmissions", { title: "Addmission Page" });
});

// router.get("/courses", (req, res) => {
//   res.render("pages/courses", { title: "Courses Page" });
// });

router.get("/gallery", (req, res) => {
  res.render("pages/gallery", { title: "Gallery Page" });
});

router.get("/placements", (req, res) => {
  res.render("pages/placements", { title: "Placements Page" });
});

router.get("/media", (req, res) => {
  res.render("pages/media", { title: "Media Page" });
});

router.get("/blogs", (req, res) => {
  res.render("pages/blogs", { title: "Blog Page" });
});

router.get("/register", (req, res) => {
  return res.render("pages/register", {
    title: "Register Page",
    // alert: "test alert",
    // redirectUrl: "/",
  });
});

router.get("/login", (req, res) => {
  return res.render("pages/login", {
    title: "Login Page",
    // alert: "test alert",
    // redirectUrl: "/",
  });
});

router.get("/verifyemail", (req, res) => {
  return res.render("pages/verifyCode");
});

export default router;
