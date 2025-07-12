import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CreatePostPage.css';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        'http://localhost:1488/create-post',
        { title, text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success('Задача успешно создана!', {
        position: 'top-right',
        autoClose: 2000,
        onClose: () => navigate('/'),
      });
    } catch (err) {
      const errors = err.response?.data?.errors;

      if (errors && Array.isArray(errors)) {
        errors.forEach((error) =>
          toast.error(error.msg, {
            position: 'top-right',
            autoClose: 3000,
          })
        );
      } else {
        toast.error('Ошибка создания задачи!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }

      console.error('Ошибка при создании задачи:', err.response?.data || err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Создание задачи</h2>

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

      <div className="form-buttons">
        <button onClick={handleSubmit} className="form-button">
          Создать
        </button>

        {}
        <button onClick={() => navigate('/')} className="form-button back-button">
          Назад
        </button>
      </div>
    </div>
  );
}

export default CreatePostPage;
