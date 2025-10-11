import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./components/header/Header"
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:1488/posts') 
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка при загрузке постов:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post._id} style={{border: '1px solid #ccc', marginBottom: '20px', padding: '10px', borderRadius: '8px'}}>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          <p><b>Лайков:</b> {post.likes.length}</p>
          <div>
            <b>Комментарии:</b>
            {post.comments.length === 0 ? (
              <p>Комментариев нет</p>
            ) : (
              <ul>
                {post.comments.map(comment => (
                  <li key={comment._id}>
                    <i>{new Date(comment.createdAt).toLocaleString()}:</i> {comment.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
