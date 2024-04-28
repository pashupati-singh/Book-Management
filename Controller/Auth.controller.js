import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { usersModel } from "../Models/Auth.model.js";
import jwt from "jsonwebtoken"





export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    const { name, email, password } = req.body;


    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "Email already exists", email });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.json({ err:err },"yasha");
      }

      const newUser = await usersModel({ name, email, password: hash });
      await newUser.save();
      res.json({ msg: "Successfully registered" });
    });
  } catch (error) {
    res.json({ error},"sdfsd" );
  }
};



export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    try {
      const { email, password } = req.body;
  
      const user = await usersModel.findOne({ email });
  
      if (user) {
        bcrypt.compare(password, user.password, async (err, result) => {
          if (err) {
            return res.json("Invalid I'd or Password");
          } else if (result) {
            try {
              const token = await jwt.sign({ userID: user._id }, process.env.KEY);
              return res.json({
                msg: "Login successfully",
                token,
                name: user.name,
              });
            } catch (error) {
              return res.json({ error });
            }
          } else {
            return res.json("Invalid ID or Password");
          }
        });
      } else {
        return res.json("User doesn't exist");
      }
    } catch (error) {
      res.json({ error });
    }
  };
  
// export const loginUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array()[0].msg });
//   }
  
//   const { email, password } = req.body;
//   try {
//       const user = await usersModel.findOne({ email });

//       if (!user) {
//           return res.status(401).json("User doesn't exist");
//       }

//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (!passwordMatch) {
//           return res.status(401).json("Invalid ID or Password");
//       }

//       const token = jwt.sign({ userID: user._id }, process.env.KEY);
//       res.json({
//           msg: "Login successfully",
//           token,
//           name: user.name,
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json("Internal server error");
//   }
// };
