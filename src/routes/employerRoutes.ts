import { createEmployer, deleteEmployer, getAllEmployers, getEmployerById, updateEmployer } from '../controllers/employerController';
import express from 'express'


const router=express.Router()

router.get('/', getAllEmployers);
router.get('/:id',getEmployerById);
router.post('/', createEmployer);
router.patch('/',updateEmployer);
router.delete('/:id', deleteEmployer);

export default router;