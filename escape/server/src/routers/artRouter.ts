import express from 'express';
import { validateToken } from '../middleware/authenticate';

const artRouter = express.Router();

artRouter.get('/home', async(req, res) => {
    const validatedUser = await validateToken(req);
    
    res.send(validatedUser);
  })