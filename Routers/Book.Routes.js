/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *     Book:
//  *       type: object
//  *       properties:
//  *          title:
//  *            type: string
//  *            description: The title of the book.
//  *          author:
//  *            type: string
//  *            description: The author of the book.
//  *          year:
//  *            type: integer
//  *            description: The year of publication of the book.
//  *       required:
//  *        - title
//  *        - author
//  *        - year
//  *   securitySchemes:
//  *     Bearer:
//  *        type: http
//  *        scheme: bearer
//  */


/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *          title:
 *            type: string
 *            description: The title of the book.
 *          author:
 *            type: string
 *            description: The author of the book.
 *          year:
 *            type: integer
 *            description: The year of publication of the book.
 *       required:
 *        - title
 *        - author
 *        - year
 *   securitySchemes:
 *     Bearer:
 *        type: http
 *        scheme: bearer
 */


import express from "express";
import { AuthMiddleware } from "../Middleware/Auth.Middleware.js";
import { validateBook } from "../Middleware/Validator.middlewares.js";
import { bookAdd, bookDelete, bookGet, bookUpdate } from "../Controller/Book.controller.js";
export const bookRoutes = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get a list of books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: Maximum number of books per page (default is 5)
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter books by year
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author (case-insensitive)
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Book added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/delete/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID 
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found or you don't have permission to delete this book
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/update/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found or you don't have permission to update this book
 *       500:
 *         description: Internal server error
 */


bookRoutes.get("/", bookGet)

bookRoutes.post("/add", AuthMiddleware,validateBook ,bookAdd)

bookRoutes.delete("/delete/:id", AuthMiddleware ,bookDelete)


bookRoutes.put("/update/:id", AuthMiddleware ,bookUpdate)