import {body} from 'express-validator';

export const loginValidation = [
    body('email', "Неверные данные входа").isEmail(),
    body('password',"Неверные данные входа").isLength({min: 3}),
  

];
export const registerValidation = [
    body('email', "Неверные данные входа").isEmail(),
    body('password',"Неверные данные входа").isLength({min: 3}),
    body('fullname',"Неверные данные входа").isLength({min: 3}),
    body('avatarUrl',"Неверные данные входа").optional().isURL(),

];



export const postCreateValidation = [
    body('title', "Введите заголовок статьи").isLength({min:3}).isString(),
    body('text', "Введите текст статьи").isLength({min:3}).isString(),
    body('tags',"Неверный формать тегов").optional().isString(),
    body('imageUrl',"Неверная ссылка картинки").optional().isString(),

];