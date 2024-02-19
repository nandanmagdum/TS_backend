"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helloRouter = (0, express_1.Router)();
helloRouter.get("/", (req, res) => {
    res.json({ "Server says": "Hello, World !" });
});
helloRouter.post("/", (req, res) => {
    res.json({ "Server says": "Post req acccepted" });
});
helloRouter.put("/", (req, res) => {
    res.json({ "server says": "Put request accepted" });
});
helloRouter.delete("/", (req, res) => {
    res.json({ "Server says": "Deleted Request Bro" });
});
exports.default = helloRouter;
