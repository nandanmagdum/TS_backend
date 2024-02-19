import { Router, Request, Response} from "express";
import { IUserInterface } from "../database/interfaces/user.interface";
import { userModel } from "../database/models/user.model";
import { createUserRepo, deleteUserRepo, getAllUsersRepo, getUserRepo, updateUserRepo } from "../repositories/user.repository";
import { deleteAllTweets } from "../repositories/tweet.repository";

export const getUserController = async(req:Request, res:Response) => {
    const userID = req.params.userId;
    try {
        const user = await getUserRepo(userID);
        if(user){
            res.json({"User": user});
        }
        else {
            res.json({"Error": "User not found"});
        }
    } catch (error) {
        console.log(error);
        res.json({"error": error});
    }
}

export const createUserController = async(req:Request, res:Response) => {
    const user = req.body;
    try {
        const success = await createUserRepo(user);
        if(success) {
            res.json({"Success": `${user} created`});
        }
        else {
            res.json({"User Create Error": "User not created"});
        }
    } catch (error) {
        console.log(error);
        res.json({"Create User Error": error});
    }
}

// update user details
export const updateUserController = async(req:Request, res:Response) => {
    const updated_user = req.body;
    try {
        const success = await updateUserRepo(updated_user);
        if(success){
            res.json({"Sucess": `${updated_user} updated`});
        } else {
            res.json({"Update Error": "User updation failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({"Update Error": error});
    }
}

// delete a user
export const deleteUserController = async(req:Request, res:Response) => {
    const userId = req.params.userId;
    try {
        const success = await deleteUserRepo(userId);
        if(success) {
            const success2 = await deleteAllTweets(userId);
            if(success2) {
                res.json({"Status": "User deleted and all the Tweets also deleted"});
            }
            else 
            res.json({"Delete req": "User deleted succesfully"});
        }
        else res.json({"Error Deleting": "User not found"});
    } catch (error) {
        console.log(error);
        res.json({"error delete user": error});
    }
}

// get all the users
export const getAllUsersController = async(req:Request, res:Response) => {
    try {
        const allUsers = await getAllUsersRepo();
        if(allUsers) {
            res.json({"Users": allUsers});
        } else {
            res.json({"getAllUsers Error" : "Error reading all the users"});
        }
    } catch (error) {
        console.log(error);
        res.json({"Error": error});
    }
}