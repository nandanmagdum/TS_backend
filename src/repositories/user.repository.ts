import mongoose from "mongoose";
import { IUserInterface } from "../database/interfaces/user.interface";
import { userModel } from "../database/models/user.model";
import { ITweetInterface } from "../database/interfaces/tweet.interface";

// get user 
export const getUserRepo = async(ID:string):Promise<IUserInterface | null> => {
    try {
        const user = await userModel.findOne({userId:ID});
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// create a user
export const createUserRepo = async(user:IUserInterface):Promise<boolean> => {
    try {
        await userModel.create(user);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// delete a user
export const deleteUserRepo = async(ID:string):Promise<boolean> => {
    try {
        const result = await userModel.findOneAndDelete({userId:ID});
        if (result) return true;
        else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// update a user
export const updateUserRepo = async(user:IUserInterface):Promise<boolean> => {
    try {
        const updatedUser = await userModel.findOneAndUpdate({userId:user.userId}, user, {new:true});
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// update user with tweetId when tweet is created by the user
export const updateUserWhenTweetCreatedRepo = async(tweet:ITweetInterface):Promise<boolean> => {

    try {
        await userModel.findOneAndUpdate({userId:tweet.adminId},{$push : {tweets:tweet.tweetId}} ,{new:true});
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// update user by removing tweetId when tweet is deleted by the user
export const updateUserWhenTweetDeletedRepo = async(adminId:string, tweetId:string):Promise<boolean> => {
    try {
        console.log(`${adminId} and ${tweetId} and ${typeof adminId} and ${typeof tweetId}`);
        await userModel.findOneAndUpdate({userId:adminId}, {$pull: {tweets:tweetId}}, {new:true});
        return true;
    } catch (error) {
        console.log("serious error");
        console.log(error);
        return false;
    }
}

// get all the Users
export const getAllUsersRepo = async():Promise<IUserInterface[] | null> => {
    try {
        const allUsers = await userModel.find();
        return allUsers;
    } catch (error) {
        console.log(error);
        return null;
    }
}