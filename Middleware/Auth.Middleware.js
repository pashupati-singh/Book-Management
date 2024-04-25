
import jwt from "jsonwebtoken";

export const AuthMiddleware = async(req,res,next) =>{
  
  try {
const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, 'privateKey', async(err, decoded)=> {
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

