import express from 'express'
import {postSignup} from '../../controller/authcontroller.js'
const authRouter=express.Router();

authRouter.post('/',postSignup)

export default authRouter;