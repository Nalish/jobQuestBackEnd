import { Router } from 'express';
import {getAllJobSeekers,getJobSeekerById,createJobSeeker,updateJobSeeker,deleteJobSeeker} from '@app/controllers/jobseekerController';

const router = Router();

router.get('/', getAllJobSeekers);
router.get('/:id', getJobSeekerById);
router.post('/', createJobSeeker);
router.put('/:id', updateJobSeeker);
router.delete('/:id', deleteJobSeeker);

export default router;
