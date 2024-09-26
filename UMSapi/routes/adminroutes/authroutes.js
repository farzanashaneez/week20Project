import {postSignin,getSignout} from '../../controller/admin/authcontroller.js'
import express from 'express'

const router=express.Router();

router.post('/signup',postSignin);
router.get('/signin',getSignout);

export default router;