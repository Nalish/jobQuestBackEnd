import { createCV, deleteCV, getAllCVs, getCVById } from '@app/controllers/cvsController';
import express from 'express'

const router=express.Router()

router.get('/',getAllCVs);
router.get('/:id',getCVById);
router.post('/',createCV);
router.delete('/:id',deleteCV)
export default router;