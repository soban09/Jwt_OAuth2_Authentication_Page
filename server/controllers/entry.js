import jwt from 'jsonwebtoken';
import { User } from '../db/userModel.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
const JWTSECRET=process.env.jwt;


export const register = async (req, res) => {
    // console.log(req.body);
    try{
        const newUser = new User(req.body)
        const response = await newUser.save();

        const token = jwt.sign({
            userId:newUser._id,
            userEmail:newUser.email
        },
        JWTSECRET,
        {expiresIn: "24h"}
        );

        res.status(200).json({
            message:"Register Successful",
            user:newUser,
            token,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong"})
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(400).json({ message: "User not found" })
        }
        if(!bcrypt.compare(req.body.password, user.password)){
            return res.status(400).json({ message: "Wrong password" })
        }

        const token = jwt.sign({
            userId:user._id,
            userEmail:user.email
        },
        JWTSECRET,
        {expiresIn: "24h"}
        );

        res.status(200).json({
            message:"Login Successful",
            user,
            token,
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
    }
}

export const authenticate = (req, res) => {
    return res.json({message:"Auth successful", user:req.user})
}