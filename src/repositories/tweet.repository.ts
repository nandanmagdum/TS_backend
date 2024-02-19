import mongoose from "mongoose";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import { tweetModel } from "../database/models/tweet.model";
import { transpileModule } from "typescript";

// read a tweet
export const getTweetRepo = async(tweetId:string):Promise<ITweetInterface | null> => {
    try {
        const tweet = await tweetModel.findOne({tweetId:tweetId});
        if(tweet) return tweet;
        else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
} 

// create tweet
export const createTweetRepo = async(tweet:ITweetInterface):Promise<boolean> => {
    try {
        await tweetModel.create(tweet);
        return true;
    } catch (error) {
        console.log(error);
        return false;   
    }
}

// updaet tweet
export const updateTweetRepo = async(tweet:ITweetInterface):Promise<boolean> => {
    try {
        await tweetModel.findOneAndUpdate({tweetId:tweet.tweetId}, tweet, {new:true});
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// delete a tweet
export const deleteTweetRepo = async(tweetId:string):Promise<boolean> => {
    try {
        const result = await tweetModel.findOneAndDelete({tweetId:tweetId});
        if(result) return true;
        else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// delete all tweets when user is deleted
export const deleteAllTweets = async(userId:string):Promise<boolean> => {
    try {
        const result = await tweetModel.deleteMany({adminId:userId});
        if(result) return true;
        else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// fetch all the tweets
export const getAllTweetsRepo = async():Promise<ITweetInterface[] | null> => {
    try {
        const allTweets = tweetModel.find();
        return allTweets
    } catch (error) {
        console.log(error);
        return null;
    }
}

// getch all the tweets of the user
export const getAllTweetofAdminRepo = async(adminId:string):Promise<ITweetInterface[] | null> => {
    try {
        const allTweetsofAdmin = tweetModel.find({adminId:adminId});
        if(allTweetsofAdmin) return allTweetsofAdmin;
        else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}