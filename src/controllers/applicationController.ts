import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import pool from '../db/db'

// Get all applications
export const getAllApplications = asyncHandler(async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM applications');
  res.status(200).json(result.rows);
});

// Get applications by user ID
export const getApplicationsByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await pool.query('SELECT * FROM applications WHERE user_id = $1', [userId]);

  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('No applications found for this user');
  }

  res.status(200).json(result.rows);
});

// Create a new application
export const createApplication = asyncHandler(async (req: Request, res: Response) => {
  const { user_id, job_id, cv_id } = req.body;

  const result = await pool.query(
    `INSERT INTO applications (user_id, job_id, cv_id, status) 
     VALUES ($1, $2, $3, 'pending') 
     RETURNING *`,
    [user_id, job_id, cv_id]
  );

  res.status(201).json(result.rows[0]);
});

// Update application status
export const updateApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const result = await pool.query(
    'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );

  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('Application not found');
  }

  res.status(200).json(result.rows[0]);
});

// Delete an application
export const deleteApplication = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM applications WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('Application not found');
  }

  await pool.query('DELETE FROM applications WHERE id = $1', [id]);

  res.status(200).json({ message: 'Application deleted successfully' });
});
