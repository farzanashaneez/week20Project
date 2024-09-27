import {getUsers,addUser,updateUser,deleteUser} from '../../controller/admin/userController.js'
import express from 'express'
import { verifyadmin } from "../../utils/verifyUser.js";
const router=express.Router();

router.get('/',verifyadmin,getUsers);
router.post('/update/:id',verifyadmin,updateUser);
router.delete('/delete/:id',verifyadmin,deleteUser);
router.post('/adduser',verifyadmin,addUser);



export default router;