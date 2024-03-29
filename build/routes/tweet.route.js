"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweet_controller_1 = require("../controllers/tweet.controller");
const tweetRouter = (0, express_1.Router)();
tweetRouter.get("/all", tweet_controller_1.getAllTweetsController);
tweetRouter.get("/all/:adminId", tweet_controller_1.getAllTweetsOfAdminController);
tweetRouter.get("/:tweetId", tweet_controller_1.getTweetController);
tweetRouter.post("/", tweet_controller_1.createTweetController);
tweetRouter.put("/", tweet_controller_1.updateTweetController);
tweetRouter.delete("/:adminId/:tweetId", tweet_controller_1.deleteTweetController);
exports.default = tweetRouter;
