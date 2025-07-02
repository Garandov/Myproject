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
import handleerrors from './utilis/handleerrors.js';

mongoose.connect('mongodb+srv://Volkazavr:0987@garandov.n0uirze.mongodb.net/')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const app = express();
app.use(express.json());

app.post('/auth/register',registerValidation,handleerrors, userControler.register);

app.post('/auth/login',loginValidation,handleerrors, userControler.login);
app.get('/auth/getMe',  checkAuth,userControler.getMe );


app.get('/post',PostControler.getAll)

app.get('/post/:id',PostControler.getOne)
app.post('/post', checkAuth,postCreateValidation,handleerrors,PostControler.create)
app.delete('/post/:id', checkAuth,PostControler.remove)
app.patch('/post/:id', checkAuth,postCreateValidation,handleerrors,PostControler.update)

app.listen(5000,() => {
  try {
  console.log('Server started');

  }
  catch {
console.log('ошибка включения сервера');

  }
  
})