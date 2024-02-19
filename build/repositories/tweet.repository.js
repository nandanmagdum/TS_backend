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
exports.getAllTweetofAdminRepo = exports.getAllTweetsRepo = exports.deleteAllTweets = exports.deleteTweetRepo = exports.updateTweetRepo = exports.createTweetRepo = exports.getTweetRepo = void 0;
const tweet_model_1 = require("../database/models/tweet.model");
// read a tweet
const getTweetRepo = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweet = yield tweet_model_1.tweetModel.findOne({ tweetId: tweetId });
        if (tweet)
            return tweet;
        else
            return null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getTweetRepo = getTweetRepo;
// create tweet
const createTweetRepo = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tweet_model_1.tweetModel.create(tweet);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.createTweetRepo = createTweetRepo;
// updaet tweet
const updateTweetRepo = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tweet_model_1.tweetModel.findOneAndUpdate({ tweetId: tweet.tweetId }, tweet, { new: true });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateTweetRepo = updateTweetRepo;
// delete a tweet
const deleteTweetRepo = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tweet_model_1.tweetModel.findOneAndDelete({ tweetId: tweetId });
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
exports.deleteTweetRepo = deleteTweetRepo;
// delete all tweets when user is deleted
const deleteAllTweets = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tweet_model_1.tweetModel.deleteMany({ adminId: userId });
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
exports.deleteAllTweets = deleteAllTweets;
// fetch all the tweets
const getAllTweetsRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTweets = tweet_model_1.tweetModel.find();
        return allTweets;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllTweetsRepo = getAllTweetsRepo;
// getch all the tweets of the user
const getAllTweetofAdminRepo = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTweetsofAdmin = tweet_model_1.tweetModel.find({ adminId: adminId });
        if (allTweetsofAdmin)
            return allTweetsofAdmin;
        else
            return null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllTweetofAdminRepo = getAllTweetofAdminRepo;
