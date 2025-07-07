import {body} from 'express-validator';

export const loginValidation = [
  body('email', 'Неверные данные входа').isEmail(),
  body('password', 'Неверные данные входа').isLength({ min: 3 }),
];

export const registerValidation = [
  body('email', 'Неверный email').isEmail(),
  body('username', 'Имя должно быть минимум 3 символа').isLength({ min: 3 }),
  body('password', 'Пароль должен быть минимум 3 символа').isLength({ min: 3 }),
];



export const postCreateValidation = [
    body('title', "Введите заголовок статьи").isLength({min:3}).isString(),
    body('text', "Введите текст статьи").isLength({min:3}).isString(),
 

];