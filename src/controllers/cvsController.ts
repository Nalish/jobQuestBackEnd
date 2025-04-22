import { Request, Response } from 'express';
import asyncHandler from '@app/middlewares/asyncHandler'
import pool  from '@app/db/db';
import path from 'path';
import fs from 'fs';

// Get all CVs
export const getAllCVs = asyncHandler(async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM cvs');
  res.status(200).json(result.rows);
});

// Get a single CV by ID
export const getCVById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM cvs WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('CV not found');
  }

  res.status(200).json(result.rows[0]);
});

// Create a new CV entry (upload a file)
export const createCV = asyncHandler(async (req: Request, res: Response) => {
  const { user_id } = req.body;  // Assuming user_id is sent in the request body
  const file = req.file;  // The uploaded file from the request
  
  if (!file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const file_name = file.originalname;
  const file_url = `/uploads/${file.filename}`;  // Assuming file is saved in 'uploads' directory

  const result = await pool.query(
    `INSERT INTO cvs (user_id, file_name, file_url) 
     VALUES ($1, $2, $3) RETURNING *`,
    [user_id, file_name, file_url]
  );

  res.status(201).json(result.rows[0]);
});

// Delete a CV
export const deleteCV = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM cvs WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('CV not found');
  }

  const fileUrl = result.rows[0].file_url;
  const filePath = path.join(__dirname, '..', 'public', fileUrl);  // Assuming files are stored in 'public/uploads'

  // Delete the file from the server
  fs.unlinkSync(filePath);

  // Delete the CV record from the database
  await pool.query('DELETE FROM cvs WHERE id = $1', [id]);

  res.status(200).json({ message: 'CV deleted successfully' });
});
