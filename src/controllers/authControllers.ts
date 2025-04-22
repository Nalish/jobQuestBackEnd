import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import bcrypt from 'bcrypt';
import pool from '../db/db';

export const registerUser = asyncHandler(async (req: Request, res: Response)=> {
  const { email, password, role_id } = req.body;

  // 1. Validate input
  if (!email || !password || !role_id) {
    res.status(400).json({ message: 'Email, password, and role are required.' });
    return;
  }

  // 2. Check if the user already exists
  const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (userExists.rows.length > 0) {
    res.status(409).json({ message: 'Email is already registered.' });
    return;
  }

  // 3. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Insert new user into the database
  const result = await pool.query(
    'INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING id, email, role_id',
    [email, hashedPassword, role_id]
  );

  // 5. Respond with success
  res.status(201).json({
    message: 'User registered successfully',
    user: result.rows[0],
  });
});


