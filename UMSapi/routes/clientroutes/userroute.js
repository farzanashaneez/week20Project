import express from "express";
import {getuser,postuser} from '../../controller/usercontroller.js'

const router = express.Router();

router.get('/',getuser);
router.post('/',postuser)
export default router;