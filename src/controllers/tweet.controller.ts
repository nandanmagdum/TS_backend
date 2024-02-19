import { Router, Request, Response } from "express";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import { createTweetRepo, deleteTweetRepo, getAllTweetofAdminRepo, getAllTweetsRepo, getTweetRepo, updateTweetRepo } from "../repositories/tweet.repository";
import { updateUserWhenTweetCreatedRepo, updateUserWhenTweetDeletedRepo } from "../repositories/user.repository";

// read a tweet
export const getTweetController = async(req:Request, res:Response) => {
    const tweetId = req.params.tweetId;
    try {
        const tweet = await getTweetRepo(tweetId);
        if(tweet) res.json({"Tweet fetched": tweet});
        else res.json({"Tweet Error": "Tweet not found"});
    } catch (error) {
        console.log(error);
        res.json({"Get Tweet Error": error});
    }
}

// create a tweet
export const createTweetController = async(req:Request, res:Response) => {
    const tweet = req.body;
    try {
        const success = await createTweetRepo(tweet);
        if(success) {
            const success2 = await updateUserWhenTweetCreatedRepo(tweet);
            if(success2)  res.json({"Created and Updated User": "Complete successs...."});
            else 
            res.json({"Tweet Created" : "Created succefully but user not updated"});
        }
        else res.json({"Error Tweet Creation": "Tweet not created"});
    } catch (error) {
        console.log(error);
        res.json({"Error": error});
    }
}

// update a tweet
export const updateTweetController = async(req:Request, res:Response) => {
    const tweet = req.body;
    try {
        const success = await updateTweetRepo(tweet);
        if(success) res.json({"Tweet Updated": "Successs"});
        else res.json({"Tweet Updatation Error": "Tweet not updated"});
    } catch (error) {
        console.log(error);
        res.json({"Error": error});
    }
}

// delete a tweet
export const deleteTweetController = async(req:Request, res:Response) => {
    const tweetId = req.params.tweetId;
    const adminId = req.params.adminId;
    console.log(`${typeof tweetId} = ${tweetId}`);
    console.log(`${typeof adminId} = ${adminId}`);
    
    try {
        const success = await deleteTweetRepo(tweetId);
        if(success) {
            const success2 = await updateUserWhenTweetDeletedRepo(adminId, tweetId);
            if(success2) res.json({"Yay": "complete success...."});
            else 
            res.json({"Delete Tweet": "Tweet delete successfullyy but user not updated.."});
        }
        else res.json({"Error deleting": "Tweet Not Found"});
    } catch (error) {
        console.log(error);
        res.json({"Error": error});
    }
}


// get all the tweets
export const getAllTweetsController = async(req:Request, res:Response) => {
    console.log(req.url);
    try {
        const allTweets = await getAllTweetsRepo();
        if(allTweets){
            res.json({"Tweets" : allTweets});
        } else {
            res.json({"Error": "Error reading all the tweets"});
        }
    } catch (error) {
        console.log(error);
        res.json({"Error": "Error fetching all Tweets"});
    }
}

// get all the tweets of Admin
export const getAllTweetsOfAdminController = async(req:Request, res:Response) => {
    const adminId = req.params.adminId;
    console.log(req.url);
    try {
        const adminTweets = await getAllTweetofAdminRepo(adminId);
        if(adminTweets?.length === 0) res.json({"Error":"User doesn't exists OR user has not created tweets"});
        else if(adminTweets) res.json({"AdminTweets": adminTweets});
        else res.json({"Admin Tweets Error": "Error getting admin tweets"}); 
    } catch (error) {   
        console.log(error);
    }
}

