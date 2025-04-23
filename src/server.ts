

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from "./routes/userRoutes";
import jobseekerRoutes from "./routes/jobseekerRoutes";
import cvsRoutes from "./routes/cvsRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import skillRoutes from "./routes/skillRoutes";
import jobseekerSkillsRoutes from "./routes/jobseekerSkillsRoutes";
import employerRoutes from "./routes/employerRoutes"
import jobSkillRoutes from "./routes/jobSkillRoutes"
import jobRoutes from "./routes/jobRoutes"

// Configure dotenv
dotenv.config();

// Instance of express
const app = express();

// Load the variables from .env
const port = Number(process.env.PORT) || 3000; // Convert the port to a number, defaulting to 3000
const IP_ADDRESS = process.env.IP_ADDRESS || '192.168.100.1'; // Default to your local IP if not set

console.log("The server is running at port:", port);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend on this port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allows cookies and auth headers
}));

// Set up routes
app.use("/api/users", userRoutes);
app.use("/api/jobseeker", jobseekerRoutes);
// app.use("/api/cvs", cvsRoutes); // Uncomment if you have this route
app.use("/api/applications", applicationRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/jobSeekerSkills", jobseekerSkillsRoutes);
app.use("/api/employers", employerRoutes)
app.use("/api/jobSkills",jobSkillRoutes)
app.use("/api/jobs",jobRoutes);

// Start the server
app.listen(port,() => {
    console.log(`Server is running at:${port}`);
});
// app.listen(3000,()=>{
//    console.log("Server Listening");
// })
