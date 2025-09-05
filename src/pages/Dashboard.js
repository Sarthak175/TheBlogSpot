import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ posts, currentUser }) => {
  const userPosts = posts.filter(post => post.authorId === currentUser);
  const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalLikes = userPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
  const totalComments = userPosts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);

  const dashboardItems = [
    {
      title: 'Posts',
      description: 'Where you write & manage all your blog posts.',
      tip: 'You can add: Stories, Motivational posts, Covid-19 experiences, Dialogues, etc.',
      link: '/',
      icon: '📝',
      count: userPosts.length
    },
    {
      title: 'Stats',
      description: 'Shows how many people read your posts, where they came from, and what devices they used.',
      tip: 'You can track which posts are most popular and write more on those topics.',
      link: '/analytics',
      icon: '📊',
      count: totalViews
    },
    {
      title: 'Comments',
      description: 'Manage all reader comments here.',
      tip: 'Encourage readers to comment by asking questions at the end of posts.',
      link: '/comments',
      icon: '💬',
      count: totalComments
    },
    {
      title: 'Earnings',
      description: 'Here you can connect your blog with Google AdSense to earn money from ads.',
      tip: 'Once approved, ads will show on your blog, and you get paid per click/view.',
      link: '/earnings',
      icon: '💰',
      count: '$0'
    },
    {
      title: 'Pages',
      description: 'Unlike posts, pages are static (don\'t change often).',
      tip: 'Add pages like: About Me, Contact Me, Privacy Policy, Disclaimer',
      link: '/pages',
      icon: '📄',
      count: '4'
    },
    {
      title: 'Layout',
      description: 'Control what appears on your homepage (sidebars, header, footer).',
      tip: 'Add widgets like: Search Bar, Popular Posts, Follow by Email, Labels (categories)',
      link: '/layout',
      icon: '🎨',
      count: 'Custom'
    },
    {
      title: 'Theme',
      description: 'Change the design of your blog.',
      tip: 'Pick a clean, modern theme. You can also customize fonts, colors, and background.',
      link: '/theme',
      icon: '🎭',
      count: 'Modern'
    },
    {
      title: 'Settings',
      description: 'Control SEO, blog title, description, custom domain, etc.',
      tip: 'Make sure: Blog title & description are catchy. Enable HTTPS for security. Add Meta tags.',
      link: '/settings',
      icon: '⚙️',
      count: 'Setup'
    },
    {
      title: 'Reading List',
      description: 'Shows latest posts from blogs you follow.',
      tip: 'Follow other motivational/story blogs for inspiration.',
      link: '/reading-list',
      icon: '📚',
      count: '0'
    },
    {
      title: 'View Blog',
      description: 'Opens your live blog as readers see it.',
      tip: 'Use this often to check how your blog looks after changes.',
      link: '/',
      icon: '👁️',
      count: 'Live'
    }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Blog Dashboard</h1>
          <p>Manage your blog and track your progress</p>
        </div>

        <div className="quick-stats">
          <div className="quick-stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>{userPosts.length}</h3>
              <p>Posts</p>
            </div>
          </div>
          <div className="quick-stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-info">
              <h3>{totalViews}</h3>
              <p>Views</p>
            </div>
          </div>

          <div className="quick-stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-info">
              <h3>{totalComments}</h3>
              <p>Comments</p>
            </div>
          </div>
        </div>

        <div className="analytics-section">
          <h2>📊 Analytics & Performance</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h3>📈 Performance</h3>
              <div className="insight-item">
                <span>Avg. Views per Post</span>
                <strong>{userPosts.length ? Math.round(totalViews / userPosts.length) : 0}</strong>
              </div>
              <div className="insight-item">
                <span>Avg. Likes per Post</span>
                <strong>{userPosts.length ? Math.round(totalLikes / userPosts.length) : 0}</strong>
              </div>
            </div>

            <div className="insight-card">
              <h3>🏆 Top Performers</h3>
              <div className="insight-item">
                <span>Most Liked Post</span>
                <strong>{userPosts.reduce((max, post) => (post.likes || 0) > (max.likes || 0) ? post : max, userPosts[0] || {})?.title?.substring(0, 30) || 'None'}...</strong>
              </div>
              <div className="insight-item">
                <span>Most Viewed Post</span>
                <strong>{userPosts.reduce((max, post) => (post.views || 0) > (max.views || 0) ? post : max, userPosts[0] || {})?.title?.substring(0, 30) || 'None'}...</strong>
              </div>
            </div>

            <div className="insight-card">
              <h3>📤 Export Data</h3>
              <p>Download all your posts as JSON file</p>
              <button onClick={() => {
                const dataStr = JSON.stringify(userPosts, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'my-blog-posts.json';
                link.click();
              }} className="btn btn-primary">
                📥 Export Posts
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <Link to={item.link} key={index} className="dashboard-card">
              <div className="card-header">
                <div className="card-icon">{item.icon}</div>
                <div className="card-count">{item.count}</div>
              </div>
              <h3>{item.title}</h3>
              <p className="card-description">{item.description}</p>
              <div className="card-tip">
                <span className="tip-icon">✅</span>
                <span className="tip-text">{item.tip}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;