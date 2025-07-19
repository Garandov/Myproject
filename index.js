import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { validationResult } from 'express-validator';
import { registerValidation, loginValidation,postCreateValidation } from './validations.js';
import UserModel from './models/User.js';
import checkAuth from './utilis/checkAuth.js';
import * as userControler from './controlers/userControler.js'
import * as PostControler from './controlers/PostControlers.js'
import path from 'path';
import { fileURLToPath } from 'url';
import handleerrors from './utilis/handleerrors.js';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;
const DB = process.env.DB;

mongoose.connect(`${DB}`)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.post('/auth/register',registerValidation,handleerrors, userControler.register);

app.post('/auth/login',loginValidation,handleerrors, userControler.login);
app.get('/getMe',  checkAuth,userControler.getMe );


app.get('/post',PostControler.getAll)

app.get('/post/:id',PostControler.getOne)
app.post('/create-post', checkAuth,postCreateValidation,handleerrors,PostControler.create)
app.delete('/post/:id', checkAuth,PostControler.remove)
app.patch('/post/:id', checkAuth,postCreateValidation,handleerrors,PostControler.update)

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT,() => {
  try {
  console.log('Server started');

  }
  catch {
console.log('ошибка включения сервера');

  }
  
})



