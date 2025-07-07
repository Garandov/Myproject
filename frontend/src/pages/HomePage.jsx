import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './HomePage.css';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:1488/getMe', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.posts);
      } catch (err) {
        toast.error('Ошибка загрузки задач');
        navigate('/login');
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:1488/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Задача удалена!');
    } catch (err) {
      toast.error('Ошибка при удалении');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Задачи</h1>
        <div>
          <Link to="/create-post" className="btn">Создать задачу</Link>
          <button onClick={handleLogout} className="btn">Выйти</button>
        </div>
      </div>

      <div className="tasks-list">
        {tasks.map((post) => (
          <div key={post._id} className="task-card">
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <div className="task-actions">
              <Link to={`/edit/${post._id}`}>
                <FaEdit className="icon-button" />
              </Link>
              <button onClick={() => handleDelete(post._id)}>
                <FaTrash className="icon-button" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
