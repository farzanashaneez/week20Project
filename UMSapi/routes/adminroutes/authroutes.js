import {postSignin,getSignout} from '../../controller/admin/authcontroller.js'
import express from 'express'

const router=express.Router();

router.get('/signout',getSignout);
router.post('/signin',postSignin);

export default router;