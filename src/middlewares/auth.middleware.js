import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    // return res.redirect("/login");
    return res.render("pages/login", {
      alert: "Please Login to upload notes",
      redirectUrl: "/login",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOCKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
    }

    req.user = user;
    next();
  } catch (error) {
    next();
  }

  next();
};

export default verifyUser;