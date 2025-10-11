import React, { useState } from 'react';
import './style.css';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="tabs">
          <button
            className={isSignIn ? 'active' : ''}
            onClick={() => setIsSignIn(true)}
          >
            Вход
          </button>
          <button
            className={!isSignIn ? 'active' : ''}
            onClick={() => setIsSignIn(false)}
          >
            Регистрация
          </button>
        </div>

        {isSignIn ? (
          <form className="auth-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Пароль" required />
            <button type="submit" className="btn">Войти</button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Имя" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Пароль" required />
            <input type="password" placeholder="Подтвердите пароль" required />
            <button type="submit" className="btn">Зарегистрироваться</button>
          </form>
        )}
      </div>
    </div>
  );
}
