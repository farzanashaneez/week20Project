import express from "express";
import {getuser,updateuser} from '../../controller/usercontroller.js'
import { verifyToken } from "../../utils/verifyUser.js";


const router = express.Router();

router.get('/',getuser);
router.post('/update/:id',verifyToken,updateuser)
export default router;