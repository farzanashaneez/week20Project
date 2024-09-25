import { error } from "console";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const postSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log("body :", email, username, password);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    //next(errorHandler(500,"something went wrong"))
    next(err);
  }
};
const postSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log("signin auth", email, password);
    const validuser = await User.findOne({ email });
    if (!validuser) return next(errorHandler(401, "Invalid Credentials"));
    console.log(password, validuser.password);
    const validpassword = bcrypt.compareSync(password, validuser.password);
    if (!validpassword) return next(errorHandler(401, "Wrong Credential"));
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validuser._doc;

    const oneHourLater = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: oneHourLater,
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(error);
  }
};
const googleAuth = async (req, res, next) => {
  console.log("google auth route",req.body)
  const { username, email, profilePicture } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;

      const oneHourLater = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: oneHourLater,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPass = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPass, 10);
      const newUser = new User({
        username: username + " " + email,
        email,
        password: hashedPassword,
        profilePicture,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;

      const oneHourLater = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: oneHourLater,
        })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};
export { postSignup, postSignin, googleAuth };
