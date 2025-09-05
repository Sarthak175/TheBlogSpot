import React, { useState } from 'react';
import './ReadingList.css';

const ReadingList = () => {
  const [readingList, setReadingList] = useState([
    {
      id: 1,
      title: 'The Art of Writing Compelling Blog Posts',
      author: 'Jane Smith',
      blog: 'Content Creator Hub',
      url: 'https://example.com/blog-writing-tips',
      category: 'Writing',
      readStatus: 'unread',
      addedDate: '2024-01-15',
      estimatedTime: '8 min read'
    },
    {
      id: 2,
      title: 'SEO Best Practices for 2024',
      author: 'John Doe',
      blog: 'Digital Marketing Pro',
      url: 'https://example.com/seo-2024',
      category: 'SEO',
      readStatus: 'read',
      addedDate: '2024-01-10',
      estimatedTime: '12 min read'
    }
  ]);

  const [newArticle, setNewArticle] = useState({
    title: '',
    author: '',
    blog: '',
    url: '',
    category: 'Writing'
  });

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Writing', 'SEO', 'Design', 'Marketing', 'Technology', 'Business'];

  const addArticle = () => {
    if (!newArticle.title || !newArticle.url) return;
    
    const article = {
      id: Date.now(),
      ...newArticle,
      readStatus: 'unread',
      addedDate: new Date().toISOString().split('T')[0],
      estimatedTime: Math.ceil(Math.random() * 15 + 3) + ' min read'
    };
    
    setReadingList([article, ...readingList]);
    setNewArticle({ title: '', author: '', blog: '', url: '', category: 'Writing' });
  };

  const toggleReadStatus = (id) => {
    setReadingList(readingList.map(item => 
      item.id === id 
        ? { ...item, readStatus: item.readStatus === 'read' ? 'unread' : 'read' }
        : item
    ));
  };

  const removeArticle = (id) => {
    setReadingList(readingList.filter(item => item.id !== id));
  };

  const filteredArticles = readingList.filter(article => {
    const matchesFilter = filter === 'all' || article.readStatus === filter;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: readingList.length,
    read: readingList.filter(item => item.readStatus === 'read').length,
    unread: readingList.filter(item => item.readStatus === 'unread').length
  };

  return (
    <div className="reading-list">
      <div className="container">
        <h1>📚 Reading List</h1>
        <p>Curate and manage articles for inspiration and learning</p>

        <div className="reading-stats">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Articles</p>
          </div>
          <div className="stat-card">
            <h3>{stats.unread}</h3>
            <p>To Read</p>
          </div>
          <div className="stat-card">
            <h3>{stats.read}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="add-article-section">
          <h2>➕ Add New Article</h2>
          <div className="add-article-form">
            <input
              type="text"
              placeholder="Article title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
            />
            <input
              type="text"
              placeholder="Author name"
              value={newArticle.author}
              onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
            />
            <input
              type="text"
              placeholder="Blog/Website name"
              value={newArticle.blog}
              onChange={(e) => setNewArticle({...newArticle, blog: e.target.value})}
            />
            <input
              type="url"
              placeholder="Article URL"
              value={newArticle.url}
              onChange={(e) => setNewArticle({...newArticle, url: e.target.value})}
            />
            <select
              value={newArticle.category}
              onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button onClick={addArticle} className="btn btn-primary">
              Add Article
            </button>
          </div>
        </div>

        <div className="reading-controls">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Articles</option>
              <option value="unread">To Read</option>
              <option value="read">Completed</option>
            </select>
          </div>
        </div>

        <div className="articles-list">
          {filteredArticles.length === 0 ? (
            <div className="empty-state">
              <p>No articles found. Start building your reading list!</p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <div key={article.id} className={`article-item ${article.readStatus}`}>
                <div className="article-content">
                  <div className="article-header">
                    <h3>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </h3>
                    <span className={`status-badge ${article.readStatus}`}>
                      {article.readStatus === 'read' ? '✓ Read' : '📖 To Read'}
                    </span>
                  </div>
                  <div className="article-meta">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.blog}</span>
                    <span>•</span>
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.estimatedTime}</span>
                    <span>•</span>
                    <span>Added {new Date(article.addedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="article-actions">
                  <button
                    onClick={() => toggleReadStatus(article.id)}
                    className="btn btn-secondary"
                  >
                    {article.readStatus === 'read' ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => removeArticle(article.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingList;