import express from "express";

const router = express.Router();
router.use(express.static("public"));

router.route("/").get((req, res) => {
  return res.render("admin/home");
});

export default router;
