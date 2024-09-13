import express from 'express';
import userRouter from './routers/userRouter';
import cors from 'cors';
import * as dotenv from "dotenv";
dotenv.config();
//dotenv.config();
//require('dotenv').config();
const port = process.env.PORT || 3000;
import './db/config';

const app = express();
// app.use(express.json());
// const routes = require('./routers/userRoutes');
app.use(express.json());
app.use(cors());
app.use('/api/', userRouter);
//app.use('/', artRouter);
app.listen(port, () => {
  console.log('Server is running on port 3000')
})