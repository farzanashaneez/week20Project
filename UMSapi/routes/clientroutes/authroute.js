import express from 'express'
import {postSignup,postSignin,googleAuth} from '../../controller/authcontroller.js'
const authRouter=express.Router();

authRouter.post('/signup',postSignup)
authRouter.post('/signin',postSignin)
authRouter.post('/google',googleAuth)



export default authRouter;