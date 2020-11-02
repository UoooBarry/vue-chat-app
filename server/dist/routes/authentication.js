"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userAuth_1 = require("../helper/userAuth");
const router = express_1.default.Router();
router.post("/register", (req, res) => {
    const hashPassword = bcrypt_1.default.hashSync(req.body.password, 10); //hash the user password
    console.log(req.body);
    user_1.default.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        login: {
            username: req.body.username,
            password: hashPassword
        }
    })
        .then(() => {
        res.json({
            message: 'success'
        });
    })
        .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({
            'login.username': req.body.username
        });
        if (!user) {
            throw new Error('No user found');
        }
        bcrypt_1.default.compare(req.body.password, user.login.password, (err, result) => {
            if (result && !err) { //if password correct
                const token = userAuth_1.generateAccessToken(user);
                res.json({
                    message: 'success',
                    user_id: user._id,
                    token: token
                });
            }
            else {
                throw new Error('Password incorrect');
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
