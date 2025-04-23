import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} from '../controllers/jobsController';

const router = express.Router();

// POST: Create a job
router.post('/', createJob);

// GET: Get all jobs
router.get('/', getAllJobs);

// GET: Get a job by ID
router.get('/:id', getJobById);

// PUT: Update a job
router.put('/:id', updateJob);

// DELETE: Delete a job
router.delete('/:id', deleteJob);

export default router;
