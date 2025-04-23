import express, {Request,Response,NextFunction}  from "express"
import asyncHandler from "../middlewares/asyncHandler"
import pool from "../db/db"
import bcrypt from 'bcryptjs';


//get Users
export const getAllUsers= asyncHandler(async (req:Request,res:Response) =>{
    try {
        const result=await pool.query("SELECT * FROM users")
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({error:"Server Error"})
        
    }

})
// Create a new user
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role_id } = req.body;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds (you can adjust this)

    // Insert user into the database with the hashed password
    const result = await pool.query(
      `INSERT INTO users (email, password, role_id) 
      VALUES ($1, $2, $3) RETURNING *`,
      [email, hashedPassword, role_id]
    );

    // Return the newly created user
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});
//updating User Data
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password, role_id } = req.body;
  
    // Check if user exists
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found!" });
    }
  
    // Keep existing values if new ones are not provided
    const existingUser = userResult.rows[0];
    const updatedEmail = email || existingUser.email;
    const updatedRoleId = role_id || existingUser.role_id;
  
    let updatedPassword = existingUser.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(password, salt);
    }
  
    // Update user
    await pool.query(
      "UPDATE users SET email = $1, password = $2, role_id = $3 WHERE id = $4",
      [updatedEmail, updatedPassword, updatedRoleId, id]
    );
  
    res.json({ message: "User updated successfully!" });
  });
  export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    // Check if user exists
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found!' });
    }
  
    // Delete the user
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  
    res.json({ message: 'User deleted successfully!' });
  });
  