import asyncHandler from "../middlewares/asyncHandler"
import { Request, Response } from "express"
import pool from "../db/db"

//Get all skills
export const getAllSkills = asyncHandler(async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM skills');
    res.status(200).json(result.rows);
});

//gET skills by UserId
export const getAllSkillsById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const result = await pool.query('SELECT * from skills WHERE id=$1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Skill not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'internal Server Error' })

    }
});

export const createSkill=asyncHandler(async(req:Request,res:Response)=>{
    const{name} =req.body
    try {
        const result =await pool.query(
            'INSERT INTO skills (name) VALUES($1) RETURNING *',[name]
        )
        res.status(201).json(result.rows[0]);
    } catch (error) {
       console.error(error);
       res.status(500).json({error:"Internal server error"});

    }
})

export const updateSkill=asyncHandler(async (req:Request,res:Response)=>{
    const {id}=req.params;
    const{name}=req.body;
    try {
        const result=await pool.query(
            'UPDATE skills SET name=$1 RETURNING *',[name,id]
        );

        if (result.rows.length ===0){
            return res.status(404).json({message:'skill not found'});
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
})

export const deleteSkill=asyncHandler(async(req:Request,res:Response)=>{
    const {id}=req.params;
    
    try {
        const result= await pool.query('DELETE FROM skills WHERE id=$1 RETURNING *',[id]);
        if(result.rows.length ===0){
            return res.status(404).json({error:"Skill Not Found"});
        }res.status(200).json({messages:"Skill deleted successfully"});

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server error"})
    }
})

