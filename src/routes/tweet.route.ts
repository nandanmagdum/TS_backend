import { Router } from "express";
import { createTweetController, deleteTweetController, getAllTweetsController, getAllTweetsOfAdminController, getTweetController, updateTweetController } from "../controllers/tweet.controller";
import { updateTweetRepo } from "../repositories/tweet.repository";

const tweetRouter = Router();

tweetRouter.get("/all", getAllTweetsController);
tweetRouter.get("/all/:adminId", getAllTweetsOfAdminController);
tweetRouter.get("/:tweetId", getTweetController);
tweetRouter.post("/", createTweetController);
tweetRouter.put("/", updateTweetController);
tweetRouter.delete("/:adminId/:tweetId", deleteTweetController);

export default tweetRouter;