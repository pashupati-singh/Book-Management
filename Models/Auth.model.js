import  mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    name :{type:String,required:true},
    email:{type:String,required:true},
    password : {type:String,required:true},
})

export const usersModel = mongoose.model("bookUsers",usersSchema)