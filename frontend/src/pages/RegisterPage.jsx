
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const { data } = await axios.post('http://localhost:1488/auth/register', {
        email,
        username,
        password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Регистрация успешна!', {
          position: 'top-right',
          autoClose: 2000,
        });
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error('Токен не получен с сервера');
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
        toast.error(err.response?.data?.message || 'Ошибка регистрации');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Регистрация</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="form-input" />
      <input type="text" placeholder="Имя пользователя" onChange={(e) => setUsername(e.target.value)} className="form-input" />
      <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} className="form-input" />
      <button onClick={handleRegister} className="form-button">Зарегистрироваться</button>
      <Link to="/login" className="form-link">Уже есть аккаунт? Войти</Link>
    </div>
  );
}

export default RegisterPage;