"use strict";
/*************************************************
 * @AUTHOR YONGQIAN HUANG, CREATED AT 20/08/2020
 * Yongqian Huang, Updated at 03/09/2020 Migrate to typescript *
 *************************************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../../.env') });
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
};
exports.generateAccessToken = generateAccessToken;
const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    //Check exsit
    if (typeof header === 'undefined') {
        res.sendStatus(403); //Forbidden
        next();
    }
    let token = header.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err)
            res.sendStatus(403);
        // Set the req user
        req.user = data.user;
        // Next
        next();
    });
};
exports.verifyToken = verifyToken;
