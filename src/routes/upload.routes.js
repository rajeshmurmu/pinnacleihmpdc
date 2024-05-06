import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadNotes } from "../controllers/notes.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(express.static("public"));
// router.use(verifyUser);
// router.use(express.static("public"));

router.route("/notes").post(upload.single("notes"), verifyUser, uploadNotes);

export default router;
