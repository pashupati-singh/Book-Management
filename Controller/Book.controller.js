

import { validationResult } from "express-validator";
import { bookModel } from "../Models/Book.model.js";

export const bookGet = async (req, res) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 5; 
    const startIndex = (page - 1) * limit;

    try {
        let query = {};

        if (req.query.year) {
            query.year = req.query.year;
        }
        if (req.query.author) {
            const authorName = req.query.author.toLowerCase();
            query.author = { $regex: authorName, $options: 'i' };
        }
        
        

        const books = await bookModel.find(query).limit(limit).skip(startIndex);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const bookAdd = async(req,res)=>{
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
}


export const bookDelete = async(req,res)=>{
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
}


export const bookUpdate = async(req,res)=>{
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
}



