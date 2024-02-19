import { Router } from "express";
import helloRouter from "./hello.route";
import userRouter from "./user.routes";
import tweetRouter from "./tweet.route";
const router = Router();

router.use("/hello",helloRouter);
router.use("/user", userRouter);
router.use("/tweet", tweetRouter)
export default router;