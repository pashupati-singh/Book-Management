import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { usersModel } from "../Models/Auth.model.js";

export const AuthRoutes = express.Router();

AuthRoutes.post("/register",async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        
        const user = await usersModel.findOne({email})
        if(user){
            return res.json({msg:"Email already exist",email})
        }else{
            bcrypt.hash(password, 5, async (err, hash)=> {
               if(err){
                return res.json({err})
               }else if(hash){
                const user = new usersModel({name,email,password:hash});
                await user.save();
                res.json({msg : "Successfully register"})
               }          
            });
        }
    } catch (error) {
        res.json({error})
    }
})


AuthRoutes.post("/login",async (req,res) =>{
    try {
        const {email,password} = req.body;
        
        const user = await usersModel.findOne({email});

        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
               if(err){
                return res.json("Invalid I'd or Password")
               }else if(result){
                jwt.sign({ userID:user._id }, "privateKey", async(err, token)=> {
                    if(err){
                        return res.json({err})
                    }else if(token){
                        return res.json({msg : "Login successfully" , token , name:user.name})
                    }
                  });
               }
            });
        }

    } catch (error) {
        res.json({error})
    }
})
