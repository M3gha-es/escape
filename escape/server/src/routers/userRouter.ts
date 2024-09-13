import express from 'express';

import {registerUser, signInUser} from '../controllers/userController';
import { validateToken } from '../middleware/authenticate';

const userRouter = express.Router();

userRouter.post('/register', async(req, res) => {
const registeredUser = await registerUser(req.body);
res.send(registeredUser)
})

userRouter.post('/signin', async(req, res) => {
  const signedInUser = await signInUser(req.body);
  res.send(signedInUser);
})

userRouter.get('/home', async(req, res) => {
  const validatedUser = await validateToken(req);
  res.send(validatedUser);
})

export default userRouter;