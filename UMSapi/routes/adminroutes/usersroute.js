import {getUsers,addUser,updateUser,deleteUser} from '../../controller/admin/userController.js'
import express from 'express'

const router=express.Router();

router.get('/',getUsers);
router.post('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.post('/adduser',addUser);



export default router;