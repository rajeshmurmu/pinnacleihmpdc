import express from "express";
import verifyUser from "../middlewares/auth.middleware.js";
import Note from "../models/notes.model.js";

const router = express.Router();
router.use(express.static("public"));

router.use(verifyUser);

router.route("/").get(async (req, res) => {
  const notes = await Note.find({}).populate("uploadedBy").select("-password");
  // console.log(notes);

  if (notes) {
    return res.render("student-corner/notes/notes", { notes: notes });
  }
  return res.render("student-corner/notes/notes");
});

router.route("/upload").get((req, res) => {
  return res.render("student-corner/notes/uploadNotes");
});

export default router;
