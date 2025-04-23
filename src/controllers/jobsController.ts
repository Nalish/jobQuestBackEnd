import {Request,Response} from "express"
import asyncHandler from '../middlewares/asyncHandler';
import pool from '../db/db'; // adjust this import to your DB connection file


// Create a new job
export const createJob = asyncHandler(async (req: Request, res: Response) => {
    const { employer_id, title, description, requirements, location, experience_level } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO jobs (employer_id, title, description, requirements, location, experience_level)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [employer_id, title, description, requirements, location, experience_level]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all jobs
export const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single job by ID
export const getJobById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a job
export const updateJob = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, requirements, location, experience_level } = req.body;

    try {
        const result = await pool.query(
            `UPDATE jobs
             SET title = $1,
                 description = $2,
                 requirements = $3,
                 location = $4,
                 experience_level = $5
             WHERE id = $6
             RETURNING *`,
            [title, description, requirements, location, experience_level, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a job
export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
