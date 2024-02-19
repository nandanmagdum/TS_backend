"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
// configuration for .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// express configuration
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");
// define routes
app.use("/api/v1", routes_1.default);
// mongoDB connection start
const mongoUrl = process.env.MONGO_DB_URI;
if (!mongoUrl) {
    console.log("Mongo DB connection error..");
    process.exit(1);
}
mongoose_1.default.connect(mongoUrl, {})
    .then(() => {
    console.log("Mongo DB connected...");
})
    .catch((error) => {
    console.log("MongoDB URL = " + error);
    process.exit(1);
});
// mongoDB connection end
try {
    const portNumber = app.get("PORT");
    const baseUrl = app.get("BASE_URL");
    server.listen(portNumber, () => {
        console.log("Server started");
    });
}
catch (error) {
    console.log(error);
}
exports.default = server;
