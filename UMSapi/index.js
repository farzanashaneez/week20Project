import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();
import userRouter from './routes/clientroutes/userroute.js';
import authRouter from './routes/clientroutes/authroute.js'

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {console.log('connected to mongodb')})
  .catch((err) => {
    console.log("error",err)
  });

const app = express();
app.use(express.json());
//app.use(cors());

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
const statusCode=err.statusCode || 500;
const message = err.message || "internal server error";
console.log("-----------------",message,err)
return res.status(statusCode).json({
    success:false,
    message,
    statusCode,
    testing:"iam tsting ---------xxxxxxxxxxxxx"
})
})
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
