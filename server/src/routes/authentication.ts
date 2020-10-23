import express, { Request, Response, NextFunction } from 'express';
import User, { ILogin } from '../models/user';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../helper/userAuth';

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 10);//hash the user password
  console.log(req.body)
  User.create({
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
      })
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(400);
    })
});


router.post("/login", async (req: Request, res: Response) => {
  const user = await User.findOne({
    'login.username': req.body.username
  })
  if (!user) {
    res.sendStatus(404);
    throw 'No user found';
  }
  bcrypt.compare(req.body.password, user.login.password, (err, result) => {
    if (result && !err) {//if password correct
      const token = generateAccessToken(user);
      res.json({
        message: 'success',
        user_id: user._id,
        token: token
      })
    } else {
      res.sendStatus(404);
    }
  })
})


export default router;