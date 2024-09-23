import { error } from "console";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs"

const postSignup=async (req,res)=>{
const {username,email,password}=req.body;
const hashedPassword=bcrypt.hashSync(password,10);
const newUser=new User({username,email,password:hashedPassword})
try{
    await newUser.save();
    res.status(201).json({message:"User Created Successfully"})
    
}
catch(err){
res.status(500).json({err})
}

}
export {postSignup}