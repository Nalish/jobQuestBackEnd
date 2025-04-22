import asyncHandler from "@app/middlewares/asyncHandler";
import { Response, Request } from "express";
import pool from "@app/db/db"


export const getAllJobseekerSkills = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM job_seeker_skills')
        res.status(200).json(result.rows)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }

})
export const getJobseekerSkillById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM skills WHERE id=$1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: " Jobseeker skill not found" })
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "internal server error" })
    }
})

export const createjobseekerSkill = asyncHandler(async (req: Request, res: Response) => {
    const { job_seeker_id, skill_id } = req.body
    try {
        const result = await pool.query('INSERT INTO job_seeker_skills(job_seeker_id,skill_id) RETURNING *',
            [job_seeker_id, skill_id])
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }
})

export const updatejobseekerSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { job_seeker_id, skill_id } = req.body
    try {
        const result = await pool.query('UPDATE job_seeker_skills WHERE id=$1 RETURNING *', [id, job_seeker_id, skill_id])
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Job seeker skill not found" })
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" })
    }
})

export const deletejobseekerSkill=asyncHandler(async(req:Request,res:Response)=>{
    const {skill_id}=req.params
    try {
        const result=await pool.query('DELETE * FROM job_seeker_skills WHERE skill_id=$1 RETURNING *',[skill_id]);
        if(result.rows.length===0){
             return res.status(404).json("Jobseeker skill not found");
        }res.status(200).json({message:"Job seeker skill deleted successfully"});

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server error"}) 
    }
})