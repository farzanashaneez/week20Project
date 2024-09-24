import { error } from "console";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";

const postSignup=async (req,res,next)=>{
const {username,email,password}=req.body;
console.log("body :",email,username,password)
const hashedPassword=bcrypt.hashSync(password,10);
const newUser=new User({username,email,password:hashedPassword})
try{
    await newUser.save();
    res.status(201).json({message:"User Created Successfully"})
    
}
catch(err){
//next(errorHandler(500,"something went wrong")) 
next(err)
}

}
export {postSignup}