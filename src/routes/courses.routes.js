import express from "express";

const router = express.Router();
router.use(express.static("public"));

router.route("/").get((req, res) => {
  return res.render("pages/courses", { title: "Courses Page" });
});
router.route("/bca").get((req, res) => {
  res.render("courses/course");
});
router.route("/bcom").get((req, res) => {
  res.render("courses/course");
});
router.route("/bsc").get((req, res) => {
  res.render("courses/course");
});
router.route("/bhmct").get((req, res) => {
  res.render("courses/course");
});
router.route("/bhm").get((req, res) => {
  res.render("courses/course");
});

export default router;
