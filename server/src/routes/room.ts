import express, { Request, Response, NextFunction, request } from 'express';
import Room from '../models/room';

const router = express.Router();

router.post("/create", (req: Request, res: Response) => {
  Room.create({
    roomName: req.body.roomName,
  })
    .then((room) => {
      res.json({
        message: 'success',
        room
      })
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

router.get('/', (req: Request, res: Response) => {
  Room.find().exec()
    .then((rooms) => {
      res.json({ rooms })
    })
    .catch(() => {
      res.sendStatus(500)
    })
})

router.get('/:id', (req: Request, res: Response) => {
  Room.findById(req.params.id).populate('currentUser','firstName').exec()
    .then((room) => {
      res.json({ room })
    })
    .catch(() => {
      res.sendStatus(500)
    })
})

export default router;