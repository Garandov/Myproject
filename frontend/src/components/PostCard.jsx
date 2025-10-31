import React, { useState } from 'react';
import api from '../api/index.js';

export default function PostCard({ post }) {
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');

  const toggleLike = async () => {
    try {
      const res = await api.post(`/post/${post._id}/like`);
      setLikesCount(res.data.likesCount);
      setIsLiked(res.data.isLiked);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!commentText) return;
    try {
      const res = await api.post(`/post/${post._id}/comment`, { text: commentText });
      setComments(prev => [...prev, res.data]);
      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      {post.imageUrl && (
        <img
          src={post.imageUrl.startsWith('/') ? `${api.defaults.baseURL}${post.imageUrl}` : post.imageUrl}
          alt="post"
          className="post-img"
        />
      )}
      <p>{post.text}</p>
      <div className="post-actions">
        <button className="btn" onClick={toggleLike}>❤️ {likesCount}</button>
      </div>

      <div className="comments">
        {comments.map((c, idx) => (
          <div className="comment" key={idx}>
            <b>{c.user?.username || 'User'}:</b> {c.text}
          </div>
        ))}
        <form onSubmit={addComment} className="comment-form">
          <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Написать комментарий" />
          <button className="btn" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
}
