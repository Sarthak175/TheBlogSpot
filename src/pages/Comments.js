import React from 'react';
import './Comments.css';

const Comments = ({ posts, currentUser }) => {
  const userPosts = posts.filter(post => post.authorId === currentUser);
  const allComments = userPosts.flatMap(post => 
    (post.comments || []).map(comment => ({
      ...comment,
      postTitle: post.title,
      postId: post.id
    }))
  );

  return (
    <div className="comments-page">
      <div className="container">
        <h1>💬 Comments Management</h1>
        <p>Manage all comments on your blog posts</p>

        <div className="comments-stats">
          <div className="stat-card">
            <h3>{allComments.length}</h3>
            <p>Total Comments</p>
          </div>
          <div className="stat-card">
            <h3>{userPosts.filter(post => post.comments?.length > 0).length}</h3>
            <p>Posts with Comments</p>
          </div>
          <div className="stat-card">
            <h3>{userPosts.length ? Math.round(allComments.length / userPosts.length) : 0}</h3>
            <p>Avg Comments/Post</p>
          </div>
        </div>

        <div className="comments-list">
          <h2>Recent Comments</h2>
          {allComments.length === 0 ? (
            <div className="no-comments">
              <p>No comments yet. Encourage readers to comment by asking questions at the end of your posts!</p>
            </div>
          ) : (
            allComments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <strong>{comment.authorName}</strong>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
                <div className="comment-post">
                  <span>On post: <strong>{comment.postTitle}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;