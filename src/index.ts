import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/routes";
import mongoose, { mongo } from "mongoose";

// configuration for .env file
dotenv.config();

const app:Express = express();
const server = http.createServer(app);

// express configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");

// define routes
app.use("/api/v1", router);

// mongoDB connection start
const mongoUrl = process.env.MONGO_DB_URI;

if(!mongoUrl) {
    console.log("Mongo DB connection error..");
    process.exit(1);
}
mongoose.connect(mongoUrl, {})
.then(() => {
    console.log("Mongo DB connected...");
})
.catch((error) => {
    console.log("MongoDB URL = " + error);
    process.exit(1);
});
// mongoDB connection end

try {
    const portNumber:Number = app.get("PORT");
    const baseUrl:String = app.get("BASE_URL");
    server.listen(portNumber, () => {
        console.log("Server started");
    })
} catch (error) {
    console.log(error);
}

export default server;