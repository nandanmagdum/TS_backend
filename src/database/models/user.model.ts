// we create userSchema and userModel

import mongoose, {Document, Schema} from "mongoose";
import { IUserInterface } from "../interfaces/user.interface";

export const userSchema = new Schema<IUserInterface>({
    userId:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    createdAt:{type:String, required:true},
    tweets:{type:[String], default:[]}
});

export const userModel = mongoose.model<IUserInterface>("UserModel", userSchema);