import { createJobSeeker } from "@app/controllers/jobseekerController";
import { createjobseekerSkill, getAllJobseekerSkills, getJobseekerSkillById } from "../controllers/jobseekerSkillsController";
import express from "express"

const router=express.Router();

router.get('/',getAllJobseekerSkills)
router.get('/:id',getJobseekerSkillById)
router.post('/',createjobseekerSkill)
export default router;
