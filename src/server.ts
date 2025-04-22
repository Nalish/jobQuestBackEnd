import { setupAliases } from "import-aliases"
setupAliases()
import express,{Request,Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from "@app/routes/userRoutes"
import jobseekerRoutes from "@app/routes/jobseekerRoutes"
import cvsRoutes from "@app/routes/cvsRoutes"
import applicationRoutes from "@app/routes/applicationRoutes"
import skillRoutes from"@app/routes/skillRoutes"
import jobseekerSkillsRoutes from "@app/routes/jobseekerSkillsRoutes"

//configure the dotenv
dotenv.config();

//instance of express
const app=express();

//load the variables
const port =process.env.PORT;//get the port
console.log("The server is running at port:",port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))//for parsing application/x-www-form-urlencoded

app.use(cors({
    origin:"http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true //allows cookies and auth headers
}))
//Create the routes

app.use("/api/users",userRoutes)
app.use("/api/jobseeker",jobseekerRoutes)
// app.use("/api/cvs",cvsRoutes)
app.use("/api/applications",applicationRoutes)
app.use("/api/skills",skillRoutes)
app.use("/api/jobSeekerSkills",jobseekerSkillsRoutes)

//test route
app.get('/',(req:Request,res:Response)=>{
    res.send("Welcome to jobQuest Backend");
})
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to jobQuest Backend");
  });

  export default app;
