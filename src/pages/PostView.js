import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostView.css';

const PostView = ({ posts, onViewPost, onLikePost, onAddComment, onTogglePin, showToast, currentUser = 'current_user' }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const foundPost = posts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      // Increment view count when post is viewed
      onViewPost(foundPost.id);
    } else {
      navigate('/');
    }
  }, [slug, posts, navigate, onViewPost]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this post: ' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard!', 'success');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment.trim() || !authorName.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    
    onAddComment(post.id, { content: comment, authorName });
    setComment('');
    setAuthorName('');
  };

  const handleEditComment = (commentId, content) => {
    setEditingComment(commentId);
    setEditContent(content);
  };

  const handleSaveEdit = (commentId) => {
    if (!editContent.trim()) {
      showToast('Comment cannot be empty', 'error');
      return;
    }
    
    // Update comment in post
    const updatedPost = {
      ...post,
      comments: post.comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: editContent, updatedAt: new Date().toISOString() }
          : comment
      )
    };
    setPost(updatedPost);
    setEditingComment(null);
    setEditContent('');
    showToast('Comment updated!', 'success');
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const updatedPost = {
        ...post,
        comments: post.comments.filter(comment => comment.id !== commentId)
      };
      setPost(updatedPost);
      showToast('Comment deleted!', 'success');
    }
  };

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="post-view">
      <div className="container">
        <article className="post-article">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <div className="author-info">
                <span className="author-name">By {post.author}</span>
                <div className="post-dates">
                  <span>Published: {new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.updatedAt !== post.createdAt && (
                    <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </div>
          </header>



          <div className="post-content">
            <p>{post.content}</p>
          </div>

          <div className="post-tags">
            {post.tags?.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>

          <div className="post-actions">
            <button 
              className={`action-btn like-btn ${post.likedBy?.includes(currentUser) ? 'liked' : ''}`}
              onClick={() => onLikePost(post.id)}
            >
              {post.likedBy?.includes(currentUser) ? '❤️' : '🤍'} {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
            </button>
            <span className="views">👁️ {post.views} Views</span>
            {(post.authorId === currentUser || currentUser === 'admin') && (
              <button 
                className={`action-btn pin-btn ${post.isPinned ? 'pinned' : ''}`}
                onClick={() => onTogglePin(post.id)}
              >
                {post.isPinned ? '📌 Unpin' : '📌 Pin'}
              </button>
            )}
          </div>

          <div className="share-section">
            <h3>Share this post with others</h3>
            <p className="share-description">Share this link so others can read your post</p>
            <div className="share-url">
              <input 
                type="text" 
                value={window.location.href} 
                readOnly 
                className="share-input"
                onClick={(e) => e.target.select()}
              />
              <button 
                onClick={() => handleShare('copy')} 
                className="btn btn-primary share-copy-btn"
              >
                📋 Copy
              </button>
            </div>
            <div className="share-buttons">
              <button onClick={() => handleShare('twitter')} className="share-btn twitter">
                🐦 Twitter
              </button>
              <button onClick={() => handleShare('linkedin')} className="share-btn linkedin">
                💼 LinkedIn
              </button>
              <button onClick={() => handleShare('whatsapp')} className="share-btn whatsapp">
                💬 WhatsApp
              </button>
              <button onClick={() => handleShare('email')} className="share-btn email">
                📧 Email
              </button>
            </div>
          </div>

          <div className="comments-section">
            <h3>Comments ({post.comments?.length || 0})</h3>
            
            <form onSubmit={handleAddComment} className="comment-form">
              <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="comment-input"
              />
              <textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-textarea"
                rows="3"
              />
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>

            <div className="comments-list">
              {post.comments?.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <div className="comment-info">
                      <strong>{comment.authorName}</strong>
                      <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString()}
                        {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                          <span className="edited-label"> (edited)</span>
                        )}
                      </span>
                    </div>
                    {(comment.authorName === 'current_user' || currentUser === 'admin') && (
                      <div className="comment-actions">
                        <button 
                          onClick={() => handleEditComment(comment.id, comment.content)}
                          className="comment-btn edit-btn"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="comment-btn delete-btn"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {editingComment === comment.id ? (
                    <div className="edit-comment-form">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="edit-textarea"
                        rows="3"
                      />
                      <div className="edit-actions">
                        <button 
                          onClick={() => handleSaveEdit(comment.id)}
                          className="btn btn-primary btn-sm"
                        >
                          Save
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="btn btn-secondary btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="comment-content">{comment.content}</p>
                  )}
                  
                  {comment.replies?.map(reply => (
                    <div key={reply.id} className="reply">
                      <div className="comment-header">
                        <strong>{reply.authorName}</strong>
                        <span className="comment-date">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="comment-content">{reply.content}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostView;