
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const AuthMiddleware = async(req,res,next) =>{
  
  try {
const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.KEY, async(err, decoded)=> {
        if(err) {
          console.log(err);
          return res.json({msg:"Restricted Area"})
        }
        else if(decoded){
          req.body.userID = decoded.userID;
         next()
    } 
      });
  } catch (error) {
    res.json({error})
  }
}

