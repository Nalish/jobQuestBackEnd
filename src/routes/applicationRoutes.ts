import { createApplication, deleteApplication, getAllApplications, getApplicationsByUserId, updateApplicationStatus } from '../controllers/applicationController';
import express from 'express'

const router=express.Router();

router.get('/',getAllApplications);
router.get('/:id',getApplicationsByUserId);
router.post('/',createApplication);
router.patch('/:id',updateApplicationStatus);
router.delete('/:id',deleteApplication);

export default router;