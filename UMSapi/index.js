import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from './routes/userroute.js';
import authRouter from './routes/authroute.js'

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {console.log('connected to mongodb')})
  .catch((err) => {
    console.log(err)
  });

const app = express();
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/signup',authRouter);


app.listen(3000, () => {
  console.log("server listening on port 3000");
});
