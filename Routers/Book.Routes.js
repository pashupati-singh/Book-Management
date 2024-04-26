
import express from "express";
import { bookModel } from "../Models/Book.model.js";
import { AuthMiddleware } from "../Middleware/Auth.Middleware.js";
import { validateBook } from "../Middleware/Validator.middlewares.js";

export const bookRoutes = express.Router();


bookRoutes.get("/", async (req, res) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 1;
    const startIndex = (page - 1) * limit;

    try {
        const books = await bookModel.find().limit(limit).skip(startIndex);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


bookRoutes.post("/add", AuthMiddleware,validateBook ,async(req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
    try {
        const book = await bookModel.create(req.body)
        await book.save();
        res.json({msg:"Book Added"})
     } catch (error) {
      res.json({error})
     }
})

bookRoutes.delete("/delete/:id", AuthMiddleware ,async(req,res)=>{
    const {userID} = req.body;
    const {id} = req.params;

    try {
        const book = await bookModel.findOne({ _id: id, userID });

        if (!book) {
            return res.status(404).json({ msg: "Book not found or you don't have permission to delete this book." });
        }

        await bookModel.findByIdAndDelete(id);
        res.json({ msg: "Book deleted", book });
     } catch (error) {
      res.json({error})
     }
})


bookRoutes.patch("/update/:id", AuthMiddleware ,async(req,res)=>{
    const { userID } = req.body;
    const { id } = req.params;

    try {
        const book = await bookModel.findOneAndUpdate({ _id: id, userID }, req.body, { new: true });

        if (!book) {
            return res.status(404).json({ msg: "Book not found or you don't have permission to update this book." });
        }

        res.json({ msg: "Book updated successfully", book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



