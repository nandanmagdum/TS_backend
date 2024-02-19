import mongoose, {Document, Schema} from "mongoose";
import { ITweetInterface } from "../interfaces/tweet.interface";

export const tweetSchema = new Schema<ITweetInterface>({
    tweetId:{type:String, required:true},
    content:{type:String, required:true},
    createdAt:{type:String, required:true},
    adminId:{type:String, required:true}
});

export const tweetModel = mongoose.model<ITweetInterface>("TweetModel", tweetSchema);