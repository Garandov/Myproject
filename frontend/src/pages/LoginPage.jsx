import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:1488/auth/login', {
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Вы вошли успешно!', {
          position: 'top-right',
          autoClose: 2000,
        });
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error('Токен не получен');
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((e) =>
          toast.error(e.msg, {
            position: 'top-right',
            autoClose: 3000,
          })
        );
      } else {
        toast.error(err.response?.data?.message || 'Ошибка входа');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Вход</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="form-input" />
      <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} className="form-input" />
      <button onClick={handleLogin} className="form-button">Войти</button>
      <Link to="/register" className="form-link">Нет аккаунта? Зарегистрироваться</Link>
    </div>
  );
}

export default LoginPage;
