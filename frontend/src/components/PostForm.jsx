import React, { useState } from 'react';
import api from '../api/index.js';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', text: '' });
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (image) {
      const data = new FormData();
      data.append('image', image);
      const res = await api.post('/upload', data);
      imageUrl = res.data.url;
    }

    await api.post('/create-post', { ...form, imageUrl });
    window.location.href = '/';
  };

  return (
    <div className="post-form">
      <h2>Создать пост</h2>
      <form onSubmit={submit}>
        <input type="text" placeholder="Заголовок" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Текст" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}></textarea>
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <button className="btn">Опубликовать</button>
      </form>
    </div>
  );
}
