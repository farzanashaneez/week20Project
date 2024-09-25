import User from "../models/usermodel.js"
import { errorHandler } from "../utils/error.js"

const getuser=(req,res)=>{
    res.json({
        message:"api working"
    })
}
const updateuser=async(req,res,next)=>{
    console.log("post is working",req.user,req.params.id)
    const {username,email,profilePicture}=req.body;
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,"you can update only your account"))
    }
      try{
        console.log("post is working2")

        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:{
            username,email,profilePicture
        }},{new:true});
        const {password,...rest}=updatedUser._doc;
        res.status(200).json(rest)
      }
      catch(err){

      }
    
}
export {getuser,updateuser}