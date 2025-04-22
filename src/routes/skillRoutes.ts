import { createSkill, deleteSkill, getAllSkills, getAllSkillsById, updateSkill } from '@app/controllers/skillController';
import express from 'express'


const router=express.Router()

router.get('/',getAllSkills);
router.get('/:id',getAllSkillsById);
router.post('/',createSkill);
router.patch('/:id',updateSkill);
router.delete('/:id',deleteSkill);


export default router;