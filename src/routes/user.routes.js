import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(express.static("public"));

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get((req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("userId")
    .render("index", { alert: "Logout Successfully", redirectUrl: "/" });
  // .redirect("/");
});

router.route("/verify").post(verifyUser);

export default router;
