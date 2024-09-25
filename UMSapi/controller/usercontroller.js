import User from "../models/usermodel.js"
import { errorHandler } from "../utils/error.js"


const updateuser=async(req,res,next)=>{
    console.log("post is working",req.user,req.body)
    const {username,email,profilePicture}=req.body;
    if(req.user.id!==req.params.id){
        console.log("post is working error")
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
        next(errorHandler(500,err.message))
      }
    
}
const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id){
        console.log("delete is working error")
        return next(errorHandler(401,"you can update only your account"))
    }
      try{
       await User.findByIdAndDelete(req.params.id)
       res.status(200).json('account deleted successfully')
      }
      catch(err){
        next(errorHandler(500,err.message))

      }
}
export {deleteUser,updateuser}