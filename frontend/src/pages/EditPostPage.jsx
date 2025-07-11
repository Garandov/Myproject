// src/pages/EditPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './CreatePostPage.css';

function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1488/post/${id}`);
        setTitle(data.title);
        setText(data.text);
      } catch (err) {
        toast.error('Не удалось загрузить задачу');
        navigate('/');
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:1488/post/${id}`,
        { title, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast('Задача обновлена!', {
        icon: () => <span style={{ fontSize: '20px', color: 'yellow' }}>✏️</span>,
        className: 'toast-delete',
        autoClose: 2000
      });
      navigate('/');
    } catch (err) {
      toast.error('Ошибка при обновлении задачи');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Редактировать задачу</h2>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />
      <textarea
        placeholder="Описание"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="form-input"
        rows={4}
      />
      <button onClick={handleUpdate} className="form-button">
        Сохранить изменения
      </button>
    </div>
  );
}

export default EditPostPage;
