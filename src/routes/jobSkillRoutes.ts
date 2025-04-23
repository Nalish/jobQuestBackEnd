import express from 'express';
import {
    createJobSkill,
    getJobSkills,
    deleteJobSkill,
    getAllJobSkills
} from '../controllers/jobSkillsController';

const router = express.Router();


router.post('/', createJobSkill);
router.get('/:job_id', getJobSkills);
router.get('/',getAllJobSkills);
router.delete('/:job_id/:skill_id', deleteJobSkill);

export default router;
