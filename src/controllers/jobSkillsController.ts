import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import pool from '../db/db'; // adjust path as needed

// Create job skill
export const createJobSkill = asyncHandler(async (req: Request, res: Response) => {
    const { job_id, skill_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO job_skills (job_id, skill_id) VALUES ($1, $2) RETURNING *`,
            [job_id, skill_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating job skill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get all job skills
export const getAllJobSkills = asyncHandler(async (_req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT 
                js.id, 
                js.job_id, 
                j.title AS job_title,
                js.skill_id, 
                s.name AS skill_name
             FROM job_skills js
             JOIN jobs j ON js.job_id = j.id
             JOIN skills s ON js.skill_id = s.id
             ORDER BY js.id`
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching all job skills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all skills for a job
export const getJobSkills = asyncHandler(async (req: Request, res: Response) => {
    const { job_id } = req.params;

    try {
        const result = await pool.query(
            `SELECT s.id, s.name
             FROM job_skills js
             JOIN skills s ON js.skill_id = s.id
             WHERE js.job_id = $1`,
            [job_id]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching job skills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a skill from a job
export const deleteJobSkill = asyncHandler(async (req: Request, res: Response) => {
    const { job_id, skill_id } = req.params;

    try {
        await pool.query(
            `DELETE FROM job_skills WHERE job_id = $1 AND skill_id = $2`,
            [job_id, skill_id]
        );
        res.status(200).json({ message: 'Skill removed from job successfully' });
    } catch (error) {
        console.error('Error deleting job skill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
