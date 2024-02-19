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
exports.getAllTweetsOfAdminController = exports.getAllTweetsController = exports.deleteTweetController = exports.updateTweetController = exports.createTweetController = exports.getTweetController = void 0;
const tweet_repository_1 = require("../repositories/tweet.repository");
const user_repository_1 = require("../repositories/user.repository");
// read a tweet
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const tweet = yield (0, tweet_repository_1.getTweetRepo)(tweetId);
        if (tweet)
            res.json({ "Tweet fetched": tweet });
        else
            res.json({ "Tweet Error": "Tweet not found" });
    }
    catch (error) {
        console.log(error);
        res.json({ "Get Tweet Error": error });
    }
});
exports.getTweetController = getTweetController;
// create a tweet
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.createTweetRepo)(tweet);
        if (success) {
            const success2 = yield (0, user_repository_1.updateUserWhenTweetCreatedRepo)(tweet);
            if (success2)
                res.json({ "Created and Updated User": "Complete successs...." });
            else
                res.json({ "Tweet Created": "Created succefully but user not updated" });
        }
        else
            res.json({ "Error Tweet Creation": "Tweet not created" });
    }
    catch (error) {
        console.log(error);
        res.json({ "Error": error });
    }
});
exports.createTweetController = createTweetController;
// update a tweet
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.updateTweetRepo)(tweet);
        if (success)
            res.json({ "Tweet Updated": "Successs" });
        else
            res.json({ "Tweet Updatation Error": "Tweet not updated" });
    }
    catch (error) {
        console.log(error);
        res.json({ "Error": error });
    }
});
exports.updateTweetController = updateTweetController;
// delete a tweet
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    const adminId = req.params.adminId;
    console.log(`${typeof tweetId} = ${tweetId}`);
    console.log(`${typeof adminId} = ${adminId}`);
    try {
        const success = yield (0, tweet_repository_1.deleteTweetRepo)(tweetId);
        if (success) {
            const success2 = yield (0, user_repository_1.updateUserWhenTweetDeletedRepo)(adminId, tweetId);
            if (success2)
                res.json({ "Yay": "complete success...." });
            else
                res.json({ "Delete Tweet": "Tweet delete successfullyy but user not updated.." });
        }
        else
            res.json({ "Error deleting": "Tweet Not Found" });
    }
    catch (error) {
        console.log(error);
        res.json({ "Error": error });
    }
});
exports.deleteTweetController = deleteTweetController;
// get all the tweets
const getAllTweetsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.url);
    try {
        const allTweets = yield (0, tweet_repository_1.getAllTweetsRepo)();
        if (allTweets) {
            res.json({ "Tweets": allTweets });
        }
        else {
            res.json({ "Error": "Error reading all the tweets" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ "Error": "Error fetching all Tweets" });
    }
});
exports.getAllTweetsController = getAllTweetsController;
// get all the tweets of Admin
const getAllTweetsOfAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.params.adminId;
    console.log(req.url);
    try {
        const adminTweets = yield (0, tweet_repository_1.getAllTweetofAdminRepo)(adminId);
        if ((adminTweets === null || adminTweets === void 0 ? void 0 : adminTweets.length) === 0)
            res.json({ "Error": "User doesn't exists OR user has not created tweets" });
        else if (adminTweets)
            res.json({ "AdminTweets": adminTweets });
        else
            res.json({ "Admin Tweets Error": "Error getting admin tweets" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllTweetsOfAdminController = getAllTweetsOfAdminController;
