import mongoose from "mongoose";

interface IComment extends mongoose.Document{
    body:string;
    author:mongoose.Schema.Types.ObjectId;
    parent:mongoose.Schema.Types.ObjectId
}

const schema = new mongoose.Schema<IComment>({
    body:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
})