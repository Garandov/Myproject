# Social Network Backend API

A backend API for a social network application built with **Node.js**, **Express.js**, and **MongoDB**.
This project demonstrates practical backend development skills, including authentication, authorization, CRUD operations, and secure data handling.

---

## 📌 Features

* User registration and login
* JWT-based authentication and authorization
* Create, update and delete posts (CRUD)
* Like and comment on posts
* File uploads (images)
* Input validation and centralized error handling

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** (NoSQL database)
* **JWT (jsonwebtoken)** – authentication
* **bcrypt** – password hashing
* **multer** – file uploads
* **express-validator** – request validation
* **dotenv** – environment variables

---

## 🔐 Security

* Passwords are securely hashed using **bcrypt**
* Access to protected routes via **JWT tokens**
* Validation of incoming data to prevent invalid or malicious requests

---

## 📂 Project Structure

```
/controllers   # Request logic
/models        # MongoDB schemas
/routes        # API routes
/middlewares   # Auth & validation middlewares
/utils         # Helper functions
index.js       # Application entry point
```

---

## ▶️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Garandov/Myproject.git
cd Myproject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Start the server

```bash
npm run dev
# or
npm start
```

The API will be available at:

```
http://localhost:5000
```

---

## 👨‍💻 My Role

* Designed RESTful API architecture
* Implemented authentication and authorization
* Worked with MongoDB models and queries
* Integrated validation and security mechanisms

---

## 📎 Use Case

This backend can be used as a base for:

* Social network applications
* Blog platforms
* Any project requiring authentication and post interaction

---

## 📬 Contact

I am a **Node.js / Express backend developer** open to freelance work and collaboration.

Feel free to contact me for backend development, API integration, or bug fixing.
