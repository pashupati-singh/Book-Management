
import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{type:String,required : true},
    author:{type:String,required : true},
    year:{type:Number,required : true},
    userID : String,
})

export const bookModel = mongoose.model('book',bookSchema);