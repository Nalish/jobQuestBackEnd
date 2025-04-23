import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/userController";
import express from "express"

const router=express.Router()

router.get('/',getAllUsers)
router.post('/',createUser)
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser)

 export default router;