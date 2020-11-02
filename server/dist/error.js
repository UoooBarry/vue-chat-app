"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    }
    else {
        res.status(500);
    }
    res.json({
        message: error.message
    });
    next();
};
exports.default = errorHandler;
