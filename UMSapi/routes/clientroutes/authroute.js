import express from 'express'
import {postSignup,postSignin,googleAuth,getSignout,postchangepassword} from '../../controller/authcontroller.js'
const authRouter=express.Router();

authRouter.post('/signup',postSignup)
authRouter.post('/signin',postSignin)
authRouter.post('/google',googleAuth)
authRouter.get('/signout',getSignout)
authRouter.post('/changepassword',postchangepassword)




export default authRouter;