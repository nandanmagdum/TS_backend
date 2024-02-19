import { Router, Request, Response} from "express";

const helloRouter  = Router();

helloRouter.get("/", (req:Request, res:Response) => {
    res.json({"Server says": "Hello, World !"});
})

helloRouter.post("/", (req:Request, res:Response) => {
    res.json({"Server says" : "Post req acccepted"});
})

helloRouter.put("/", (req:Request, res:Response) => {
    res.json({"server says": "Put request accepted"});
})

helloRouter.delete("/", (req:Request, res:Response) => {
    res.json({"Server says": "Deleted Request Bro"});
})

export default helloRouter;