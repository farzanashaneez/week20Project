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
    console.log(password,validuser.password)
    const validpassword = bcrypt.compareSync(password, validuser.password);
    if (!validpassword) return next(errorHandler(401, "Wrong Credential"));
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const {password:hashedPassword,...rest}=validuser._doc;

    const oneHourLater = new Date(Date.now() + 3600000); 
    res
      .cookie("access_token", token, { 
          httpOnly: true, 
          expires: oneHourLater 
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(error);
  }
};
export { postSignup, postSignin };
