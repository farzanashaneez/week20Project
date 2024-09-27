import User from "../../models/usermodel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../../utils/error.js";

const getUsers = async (req, res, next) => {
  const { username } = req.query;
  const reg = username ? username : "";

  try {
    const users = await User.find(
      { username: { $regex: reg, $options: "i" } },
      { username: 1, email: 1, profilePicture: 1 }
    ).sort({createdAt:-1});
    res.status(200).json(users);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

const addUser =async (req, res, next) => {
  
  const { username, email, password } = req.body;
  console.log("body :", email, username, password);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }

};
const updateUser = async(req, res, next) => {
    const {username,email,profilePicture}=req.body;
   
      try{
        console.log("post is working2")

        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:{
            username,email,profilePicture
        }},{new:true});

         const users = await User.find().sort({createdAt:-1});
         console.log("users",users)
        res.status(200).json(users)
      }
      catch(err){
        next(errorHandler(500,err.message))
      }
};
const deleteUser =async (req, res, next) => {
  const {username,email,profilePicture}=req.body;
 
    try{
      console.log("post is working2")

      const updatedUser=await User.findByIdAndDelete(req.params.id)
console.log(updateUser)
       const users = await User.find().sort({createdAt:-1});
       console.log("users",users)
      res.status(200).json(users)
    }
    catch(err){
      next(errorHandler(500,err.message))
    }{}
};

export { getUsers, addUser, updateUser, deleteUser };
