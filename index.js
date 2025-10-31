import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import checkAuth from './utilis/checkAuth.js';
import * as userControler from './controlers/userControler.js';
import * as PostControler from './controlers/PostControlers.js';
import path from 'path';
import { fileURLToPath } from 'url';
import handleerrors from './utilis/handleerrors.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const PORT = process.env.PORT;
const DB = process.env.DB;

mongoose
  .connect(`${DB}`)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/register', registerValidation, handleerrors, userControler.register);
app.post('/post/:id/comment', checkAuth, PostControler.addComment);
app.post('/post/:id/like', checkAuth, PostControler.toggleLike);
app.post('/login', loginValidation, handleerrors, userControler.login);
app.get('/getMe', checkAuth, userControler.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostControler.getAll);
app.get('/post/:id', PostControler.getOne);
app.post('/create-post', checkAuth, postCreateValidation, handleerrors, PostControler.create);
app.delete('/post/:id', checkAuth, PostControler.remove);
app.patch('/post/:id', checkAuth, postCreateValidation, handleerrors, PostControler.update);

app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  try {
    console.log(`Server started on port ${PORT}`);
  } catch {
    console.log('Ошибка включения сервера');
  }
});
