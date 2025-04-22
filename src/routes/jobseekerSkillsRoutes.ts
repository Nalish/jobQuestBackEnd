import { getAllJobseekerSkills, getJobseekerSkillById } from "@app/controllers/jobseekerSkillsController";
import express from "express"

const router=express.Router();

router.get('/',getAllJobseekerSkills)
router.get('/:id',getJobseekerSkillById)

export default router;
