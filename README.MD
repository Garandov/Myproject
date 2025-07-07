# Task Manager App

Полноценное веб-приложение для создания, редактирования и удаления задач. Используется стек MERN (MongoDB, Express, React, Node.js), с авторизацией через JWT.

## 🚀 Функционал

- ✅ Регистрация и вход в систему
- ✅ Хранение токена авторизации в `localStorage`
- ✅ Защита маршрутов (например, `/create-post`)
- ✅ Создание, редактирование и удаление задач
- ✅ Уведомления через `react-toastify`
- ✅ Защита API через middleware (`checkAuth`)

---

## 📦 Стек технологий

### 🖥️ Frontend:
- React
- React Router
- Axios
- React Icons
- React Toastify

### 🌐 Backend:
- Node.js
- Express
- MongoDB (через Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- express-validator
- dotenv
- cors

---
YOUTUBE-SRC-MAIN/
│
├── controllers/          # Контроллеры (Post, User)
├── models/               # Mongoose модели
├── utils/                # Middleware и утилиты
├── validations.js        # Валидации express-validator
├── index.js              # Точка входа backend
├── .env                  # Переменные окружения
├── frontend/             # React-приложение
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
├── README.md
└── package.json

---
🧠 Автор
👤 Имя: Dima Garandov 

📧 Email: hroldima30@gmail.com