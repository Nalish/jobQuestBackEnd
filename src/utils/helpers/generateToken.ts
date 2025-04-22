import { Response } from "express";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"


dotenv.config()

//debugging to check if env files are loaded correctly
console.log("JWT_secret",process.env.JWT_SECRET)
console.log("REFRESH_TOKEN_SECRET",process.env.REFRESH_TOKEN_SECRET)
console.log("ACCESS_TOKEN_SECRET",process.env.ACCESS_TOKEN_SECRET)

export const generateToken = (res:Response, userId: string, roleId: number) => {
    const jwtSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!jwtSecret || !refreshSecret) {
        throw new Error("JWT_SECRET or REFRESH_TOKEN_SECRET is not defined in environment variables");
    }
    try {
        ///a shortlived acces token for 15mins
        const accessToken=jwt.sign({userId,roleId},jwtSecret,{expiresIn:"15m"})
        const refreshToken=jwt.sign({userId},jwtSecret,{expiresIn:"30d"})

        //set access token as http only secure cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // Secure in production
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
         // Set Refresh Token as HTTP-Only Secure Cookie
         res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
            return{accessToken,refreshToken}
    } catch (error) {
        console.error("Error generating JWT:", error);
        throw new Error("Error generating authentication tokens");
    
    }
}