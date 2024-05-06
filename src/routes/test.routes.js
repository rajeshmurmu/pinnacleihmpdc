import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadNotes } from "../controllers/notes.controller.js";

const router = express.Router();

router.route("/notes").post(upload.single("notes"), uploadNotes);

export default router;
