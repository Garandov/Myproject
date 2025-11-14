import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreatePost from './components/PostForm.jsx';
import Profile from './pages/Profile.jsx';
import './styles.css';

export default function App() {
  const isAuth = Boolean(localStorage.getItem('token'));

  return (
    <Router>
      {/* Корневой div без фонового изображения в inline-стилях, фон через CSS */}
      <div id="app-root">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isAuth ? <Navigate to="/" /> : <Register />} />
            <Route path="/create" element={isAuth ? <CreatePost /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
