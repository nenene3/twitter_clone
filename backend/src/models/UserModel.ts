import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  comparePassword(enterPassword:string):boolean
}
import jwt, { Secret }  from "jsonwebtoken";
import config from "../config/config";



const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: "string",
    required: [true, "pls enter email"],
    unique: [true, "email already exists"],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] 
  },
  username: {
    type: "string",
    required: [true, "pls enter username"],
    unique: [true, "theres already username with this name"],
  },
  password: {
    type: String,
    required: [true, "pls enter password"],
    select:false
  },
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) next()
    const salt =await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.comparePassword = async function (enterPassword:string) {
    return await bcrypt.compare(enterPassword, this.password);
  };


const User = mongoose.model<IUser>('User',userSchema)



export default User