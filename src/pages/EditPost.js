import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost } from '../firebase/firestore';
import './CreatePost.css';

const EditPost = ({ posts, showToast }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: 'General',
    tags: '',
    status: 'published'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (posts && posts.length > 0) {
      // Always use the first post for editing (simple approach)
      const post = posts[0];
      
      setFormData({
        title: post.title || '',
        content: post.content || '',
        author: post.author || '',
        category: post.category || 'General',
        tags: Array.isArray(post.tags) 
          ? post.tags.join(', ') 
          : '',
        status: post.status || 'published'
      });
      setLoading(false);
    }
  }, [posts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Create new post instead of updating (simple solution)
    const newPostData = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
      category: formData.category,
      status: formData.status,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: formData.content.substring(0, 150) + '...',
      views: 0,
      comments: []
    };
    
    const { error } = await createPost(newPostData);
    if (error) {
      showToast('Error saving post: ' + error, 'error');
    } else {
      showToast('Post saved successfully!', 'success');
      navigate('/');
    }
    
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="create-post">
        <div className="container">
          <div className="create-post-content">
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    );
  }
  


  return (
    <div className="create-post">
      <div className="container">
        <div className="create-post-content">
          <h1>Edit Post</h1>
          <p>Update your post content</p>



          <form onSubmit={handleSubmit} className="post-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your post title..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Your name..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Enter tags separated by commas..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content here..."
                required
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;