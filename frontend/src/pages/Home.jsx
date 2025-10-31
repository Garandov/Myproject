import React, { useEffect, useState } from 'react';
import api from '../api/index.js';
import PostCard from '../components/PostCard.jsx';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/posts');
      setPosts(res.data);
    };
    load();
  }, []);

  return (
    <div>
      <h2>Лента</h2>
      {posts.length === 0 && <p>Постов пока нет</p>}
      {posts.map((p) => <PostCard key={p._id} post={p} />)}
    </div>
  );
}
