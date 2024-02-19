"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserController = void 0;
const user_repository_1 = require("../repositories/user.repository");
const tweet_repository_1 = require("../repositories/tweet.repository");
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.userId;
    try {
        const user = yield (0, user_repository_1.getUserRepo)(userID);
        if (user) {
            res.json({ "User": user });
        }
        else {
            res.json({ "Error": "User not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ "error": error });
    }
});
exports.getUserController = getUserController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const success = yield (0, user_repository_1.createUserRepo)(user);
        if (success) {
            res.json({ "Success": `${user} created` });
        }
        else {
            res.json({ "User Create Error": "User not created" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ "Create User Error": error });
    }
});
exports.createUserController = createUserController;
// update user details
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated_user = req.body;
    try {
        const success = yield (0, user_repository_1.updateUserRepo)(updated_user);
        if (success) {
            res.json({ "Sucess": `${updated_user} updated` });
        }
        else {
            res.json({ "Update Error": "User updation failed" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ "Update Error": error });
    }
});
exports.updateUserController = updateUserController;
// delete a user
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const success = yield (0, user_repository_1.deleteUserRepo)(userId);
        if (success) {
            const success2 = yield (0, tweet_repository_1.deleteAllTweets)(userId);
            if (success2) {
                res.json({ "Status": "User deleted and all the Tweets also deleted" });
            }
            else
                res.json({ "Delete req": "User deleted succesfully" });
        }
        else
            res.json({ "Error Deleting": "User not found" });
    }
    catch (error) {
        console.log(error);
        res.json({ "error delete user": error });
    }
});
exports.deleteUserController = deleteUserController;
// get all the users
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, user_repository_1.getAllUsersRepo)();
        if (allUsers) {
            res.json({ "Users": allUsers });
        }
        else {
            res.json({ "getAllUsers Error": "Error reading all the users" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ "Error": error });
    }
});
exports.getAllUsersController = getAllUsersController;
