import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(express.static("public"));

router.use(verifyUser);

router.route("/").get((req, res) => {
  return res.render("student-corner/notes/notes");
});

router
  .route("/upload")
  .get((req, res) => {
    return res.render("student-corner/notes/uploadNotes");
  })
  .post((req, res) => {});

export default router;
