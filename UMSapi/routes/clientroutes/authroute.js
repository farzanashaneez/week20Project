import express from 'express'
import {postSignup,postSignin} from '../../controller/authcontroller.js'
const authRouter=express.Router();

authRouter.post('/signup',postSignup)
authRouter.post('/signin',postSignin)


export default authRouter;