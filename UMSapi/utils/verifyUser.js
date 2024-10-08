import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;

console.log("delete called",token)
    if(!token) return next(errorHandler(401,"you are not authenticated")) 

jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    console.log("delete called",user)

    if(err) return next(errorHandler(403,"Access denied"))
    req.user=user;
    next();
})
    
}
export const verifyadmin=(req,res,next)=>{
    const token=req.cookies.admin_token;

console.log("delete called",token)
    if(!token) return next(errorHandler(401,"you are not authenticated")) 

jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    console.log("delete called",user)

    if(err) return next(errorHandler(403,"Access denied"))
    req.user=user;
    next();
})
    
}