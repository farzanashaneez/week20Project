import express from "express";
import {updateuser,deleteUser} from '../../controller/usercontroller.js'
import { verifyToken } from "../../utils/verifyUser.js";


const router = express.Router();


router.post('/update/:id',verifyToken,updateuser)
router.delete('/delete/:id',verifyToken,deleteUser)

export default router;