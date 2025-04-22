import { Request, Response } from 'express';
import asyncHandler from '@app/middlewares/asyncHandler';
import pool from '@app/db/db';

// Get all employer profiles
export const getAllEmployers = asyncHandler(async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM employer_profiles');
  res.status(200).json(result.rows);
});

// Get a single employer profile by ID
export const getEmployerById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM employer_profiles WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('Employer not found');
  }
  res.status(200).json(result.rows[0]);
});

// Create a new employer profile
export const createEmployer = asyncHandler(async (req: Request, res: Response) => {
  const { user_id, company_name, contact_person, website, industry, location } = req.body;

  const result = await pool.query(
    `INSERT INTO employer_profiles (user_id, company_name, contact_person, website, industry, location)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user_id, company_name, contact_person, website, industry, location]
  );
  res.status(201).json(result.rows[0]);
});

// Update an employer profile
export const updateEmployer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { company_name, contact_person, website, industry, location } = req.body;

  const result = await pool.query(
    `UPDATE employer_profiles SET
       company_name = $1,
       contact_person = $2,
       website = $3,
       industry = $4,
       location = $5
     WHERE id = $6 RETURNING *`,
    [company_name, contact_person, website, industry, location, id]
  );
  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('Employer not found');
  }
  res.status(200).json(result.rows[0]);
});

// Delete an employer profile
export const deleteEmployer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM employer_profiles WHERE id = $1 RETURNING *', [id]);
  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('Employer not found');
  }
  res.status(200).json({ message: 'Employer deleted successfully' });
});
