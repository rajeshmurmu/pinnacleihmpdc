import express from "express";
import notesRoutes from "./notes.routes.js";
// import verifyUser from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(express.static("public"));

// secure routes
router.use("/notes", notesRoutes);

router.route("/libraryStore").get((req, res) => {
  return res.render("student-corner/libraryStore/library");
});

router.route("/eBooks").get((req, res) => {
  return res.render("student-corner/eBooks/eBooks");
});

export default router;
