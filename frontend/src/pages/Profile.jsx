import React, { useEffect, useState } from 'react';
import api from '../api/index.js';
import PostCard from '../components/PostCard.jsx';

export default function Profile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/getMe');
      setData(res.data);
    };
    load();
  }, []);

  if (!data) return <div>Загрузка...</div>;

  return (
    <div className="profile">
      <h2>Профиль: {data.user.username}</h2>
      {data.user.avatarUrl && <img src={`${api.defaults.baseURL}${data.user.avatarUrl}`} alt="avatar" className="avatar" />}
      <h3>Мои посты</h3>
      {data.posts.map(p => <PostCard key={p._id} post={p} />)}
    </div>
  );
}
