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
exports.getAllUsersRepo = exports.updateUserWhenTweetDeletedRepo = exports.updateUserWhenTweetCreatedRepo = exports.updateUserRepo = exports.deleteUserRepo = exports.createUserRepo = exports.getUserRepo = void 0;
const user_model_1 = require("../database/models/user.model");
// get user 
const getUserRepo = (ID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.userModel.findOne({ userId: ID });
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getUserRepo = getUserRepo;
// create a user
const createUserRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.userModel.create(user);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.createUserRepo = createUserRepo;
// delete a user
const deleteUserRepo = (ID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.userModel.findOneAndDelete({ userId: ID });
        if (result)
            return true;
        else
            return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.deleteUserRepo = deleteUserRepo;
// update a user
const updateUserRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.userModel.findOneAndUpdate({ userId: user.userId }, user, { new: true });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUserRepo = updateUserRepo;
// update user with tweetId when tweet is created by the user
const updateUserWhenTweetCreatedRepo = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.userModel.findOneAndUpdate({ userId: tweet.adminId }, { $push: { tweets: tweet.tweetId } }, { new: true });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUserWhenTweetCreatedRepo = updateUserWhenTweetCreatedRepo;
// update user by removing tweetId when tweet is deleted by the user
const updateUserWhenTweetDeletedRepo = (adminId, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`${adminId} and ${tweetId} and ${typeof adminId} and ${typeof tweetId}`);
        yield user_model_1.userModel.findOneAndUpdate({ userId: adminId }, { $pull: { tweets: tweetId } }, { new: true });
        return true;
    }
    catch (error) {
        console.log("serious error");
        console.log(error);
        return false;
    }
});
exports.updateUserWhenTweetDeletedRepo = updateUserWhenTweetDeletedRepo;
// get all the Users
const getAllUsersRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_model_1.userModel.find();
        return allUsers;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllUsersRepo = getAllUsersRepo;
