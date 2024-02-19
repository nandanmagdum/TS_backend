import { Document } from "mongoose";

export interface IUserInterface extends Document {
    userId:string,
    firstName:string,
    lastName:string,
    email:string,
    createdAt:string,
    tweets:string[]
}

