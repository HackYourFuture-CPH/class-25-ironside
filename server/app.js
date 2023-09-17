"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const uiBuildPath = path_1.default.join(__dirname, "../frontend/build/");
app.use(express_1.default.static(uiBuildPath));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
if (process.env.API_PATH) {
    app.use(process.env.API_PATH, routes_1.default);
}
else {
    throw "API_PATH is not set. Remember to set it in your .env file";
}
app.use("*", (req, res) => {
    res.sendFile(path_1.default.join(`${uiBuildPath}/index.html`));
});
exports.default = app;
