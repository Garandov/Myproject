import React, { useState, useEffect } from "react";
import "./Header.css"
import { Link } from 'react-router-dom';

export default function Header({ onLogout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    if (onLogout) onLogout();
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => window.location.href = "/"}>
        Garandov
      </div>

      <div className="header-right">
        {!isLoggedIn ? (
          <Link to="/login" className="auth-btn">Авторизация</Link>
        ) :(
          <>
            <Link to="/profile">Профиль</Link>
            <button onClick={handleLogout}>Выйти</button>
          </>
        )}
      </div>
    </header>
  );
}
