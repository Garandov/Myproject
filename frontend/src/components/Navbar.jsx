import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isAuth = Boolean(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="navbar">
      <Link to="/" className="brand">Garandov</Link>
      <div className="nav-right">
        {isAuth ? (
          <>
            <Link to="/create" className="nav-link">Создать пост</Link>
            <Link to="/profile" className="nav-link">Профиль</Link>
            <button className="btn" onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Вход</Link>
            <Link to="/register" className="nav-link">Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
