import { deleteUser, getAllUsers, updateUser } from "@app/controllers/userController";
import express from "express"

const router=express.Router()

router.get('/',getAllUsers)
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser)

 export default router;