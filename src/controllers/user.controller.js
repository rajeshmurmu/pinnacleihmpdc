import User from "../models/user.model.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, course } =
    req.body;
  // console.log(firstName, lastName, email, password, phoneNumber, course);

  try {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(200).render("pages/register", {
        alert: "User Already Exist Please Login",
        redirectUrl: "/login",
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      course,
      verifyCode,
      verifyCodeExpiry: expiryDate,
    });

    const emailResponse = await sendVerificationEmail(
      user.email,
      "Pinnacle Degree College || Email Verification Code",
      user,
      verifyCode
    );

    if (!emailResponse) {
      return res.status(201).render("pages/register", {
        alert: "Something Went Wrong Please Try Again",
        redirectUrl: "/register",
      });
    }
    await user.save();

    return res.status(201).render("pages/register", {
      alert: "Register Successfully || Please verify your email",
      redirectUrl: "/login",
    });
  } catch (error) {
    console.log(`Error while registering user`, error);
    return res.render("pages/register", {
      alert: "Internal Server error",
      redirectUrl: "/register",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).render("pages/register", {
        alert: "Unauthorized Request",
        redirectUrl: "/login",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).render("pages/lgoin", {
        alert: "Incorrect Email or Password",
        redirectUrl: "/login",
      });
    }

    const accessToken = await user.generateAccessToken();

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, options).cookie("userId", user._id);
    return res.status(202).render("pages/login", {
      alert: "Login Successfully",
      redirectUrl: "/",
    });
  } catch (error) {
    console.log(`Error while login user`, error);
    return res.status(500).render("pages/login", {
      alert: "Internal Server Error Please Login again",
      redirectUrl: "/login",
    });
  }
};

const verifyUser = async (req, res) => {
  const { verifycode } = req.body;
  console.log(verifycode);
  if (!verifycode) {
    return res.status(404).render("pages/verifyCode", {
      alert: "Verify Code is Required",
      redirectUrl: "/verifyemail",
    });
  }

  try {
    const existedUser = await User.findOne({ verifyCode: verifycode });
    if (!existedUser) {
      return res.status(404).render("pages/verifyCode", {
        alert: "Invalid Verification Code",
        redirectUrl: "/verifyemail",
      });
    }

    existedUser.isVerified = true;
    existedUser.verifyCode = undefined;
    await existedUser.save();

    return res.status(200).render("pages/verifyCode", {
      alert: "User Verified Successfully",
      redirectUrl: "/login",
    });
  } catch (error) {
    console.log(`Error While verifying email`, error);
    // todo fix popup
    return res.status(404).render("pages/verifyCode", {
      alert: "Internal Server Error Please try again",
      redirectUrl: "/verifyemail",
    });
  }
};

export { registerUser, loginUser, verifyUser };
