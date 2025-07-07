import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Список задач</h1>
      <button onClick={handleLogout} className="logout-button">
        Выйти
      </button>
    </header>
  );
}