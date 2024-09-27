import User from "../../models/usermodel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";

const postSignin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validuser = await User.findOne({ email,isAdmin:true });
      if (!validuser) return next(errorHandler(401, "Invalid Credentials"));
      console.log(password, validuser.password);
      const validpassword = bcrypt.compareSync(password, validuser.password);
      if (!validpassword) return next(errorHandler(401, "Wrong Credential"));

      const token = jwt.sign({ id: validuser._id,isAdmin:true }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validuser._doc;
  
      const oneHourLater = new Date(Date.now() + 3600000);
      res
        .cookie("admin_token", token, {
          httpOnly: true,
          expires: oneHourLater,
        })
        .status(200)
        .json(rest);
    } catch (err) {
      next(err);
    }
  };
  const getSignout=(req,res,next)=>{
    console.log("insignout")
   res.clearCookie('admin_token').status(200).json('signout success')
   }
export {getSignout,postSignin};