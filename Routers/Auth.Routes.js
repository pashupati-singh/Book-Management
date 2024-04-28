
import express from "express";
import {loginUser, registerUser} from "../Controller/Auth.controller.js"
import { validateLogin, validateRegistration } from "../Middleware/Validator.middlewares.js";
import dotenv from "dotenv";
import { usersModel } from "../Models/Auth.model.js";
dotenv.config();

export const AuthRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *      name:
 *       type: string
 *       description: The name of the user.
 *      email:
 *       type: string
 *       description: The email address of the user.
 *      password:
 *        type: string
 *        description: The password of the user.
 *    required:
 *     - name
 *     - email
 *     - password
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */


AuthRoutes.get('/', async (req, res) => {
    try {
        const users = await usersModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


AuthRoutes.post("/register",validateRegistration, registerUser)


AuthRoutes.post("/login", validateLogin,loginUser );
  