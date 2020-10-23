"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_1 = __importDefault(require("../models/room"));
const router = express_1.default.Router();
router.post("/create", (req, res) => {
    room_1.default.create({
        roomName: req.body.roomName,
    })
        .then((room) => {
        res.json({
            message: 'success',
            room
        });
    })
        .catch((err) => {
        res.sendStatus(400);
    });
});
router.get('/', (req, res) => {
    room_1.default.find().exec()
        .then((rooms) => {
        res.json({ rooms });
    })
        .catch(() => {
        res.sendStatus(500);
    });
});
router.get('/:id', (req, res) => {
    room_1.default.findById(req.params.id).populate('currentUser', 'firstName').exec()
        .then((room) => {
        res.json({ room });
    })
        .catch(() => {
        res.sendStatus(500);
    });
});
exports.default = router;
