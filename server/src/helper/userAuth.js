/*************************************************
 * @AUTHOR YONGQIAN HUANG, CREATED AT 20/08/2020
 * Yongqian Huang, Updated at 03/09/2020 Migrate to typescript *
 *************************************************/

import JWT, { Secret } from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import path from "path";

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const generateAccessToken = (user) => {
    return JWT.sign({user}, process.env.ACCESS_TOKEN_SECRET);
}

const verifyToken =  (req, res, next) => {
    const header = req.headers['authorization'];
    //Check exsit
    if (typeof header === 'undefined') {
        res.sendStatus(403) //Forbidden
        next();
    }
    let token = header.split(' ')[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) res.sendStatus(403) 
        // Set the req user
        req.user = data.user;
        // Next
        next();
    });
}

export {generateAccessToken, verifyToken}