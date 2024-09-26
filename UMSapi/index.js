import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieparser from 'cookie-parser'

dotenv.config();
import userRouter from './routes/clientroutes/userroute.js';
import authRouter from './routes/clientroutes/authroute.js'
import adminauth from './routes/adminroutes/authroutes.js'
import admindashboard from './routes/adminroutes/usersroute.js'


mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {console.log('connected to mongodb')})
  .catch((err) => {
    console.log("error",err)
  });

const app = express();
app.use(express.json());
app.use(cookieparser());

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/admin/auth',adminauth);
app.use('/api/admin/dashboard',admindashboard)


app.use((err,req,res,next)=>{
const statusCode=err.statusCode || 500;
const message = err.message || "internal server error";
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
