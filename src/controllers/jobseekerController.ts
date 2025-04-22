import { Request, Response } from 'express';
import pool from '@app/db/db'
import asyncHandler from '@app/middlewares/asyncHandler';
// Get all job seeker profiles
export const getAllJobSeekers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM job_seeker_profiles');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve job seeker profiles' });
  }
});

// Get a single job seeker profile by ID
export const getJobSeekerById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM job_seeker_profiles WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve job seeker' });
  }
});

// Create a new job seeker profile
export const createJobSeeker =asyncHandler( async (req: Request, res: Response) => {
  const { user_id, first_name, last_name, country, date_of_birth, job_role, experience_level } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO job_seeker_profiles 
      (user_id, first_name, last_name, country, date_of_birth, job_role, experience_level)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_id, first_name, last_name, country, date_of_birth, job_role, experience_level]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job seeker profile' });
  }
});

// Update a job seeker profile
export const updateJobSeeker =asyncHandler( async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, last_name, country, date_of_birth, job_role, experience_level } = req.body;

  try {
    const result = await pool.query(
      `UPDATE job_seeker_profiles 
       SET first_name = $1, last_name = $2, country = $3, date_of_birth = $4, 
           job_role = $5, experience_level = $6 
       WHERE id = $7 RETURNING *`,
      [first_name, last_name, country, date_of_birth, job_role, experience_level, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job seeker profile' });
  }
});

// Delete a job seeker profile
export const deleteJobSeeker =asyncHandler( async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM job_seeker_profiles WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }

    res.status(200).json({ message: 'Job seeker profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job seeker profile' });
  }
});

