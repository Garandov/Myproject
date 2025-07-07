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
import cors from 'cors';


mongoose.connect('mongodb+srv://Garandov:12332111@cluster0.o9c10fo.mongodb.net/')
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

app.get('/auth/register', (req,res) => {

})
app.get('/post',PostControler.getAll)

app.get('/post/:id',PostControler.getOne)
app.post('/create-post', checkAuth,postCreateValidation,handleerrors,PostControler.create)
app.delete('/post/:id', checkAuth,PostControler.remove)
app.patch('/post/:id', checkAuth,postCreateValidation,handleerrors,PostControler.update)

app.listen(1488,() => {
  try {
  console.log('Server started');

  }
  catch {
console.log('ошибка включения сервера');

  }
  
})



