import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import PostView from './pages/PostView';
import Category from './pages/Category';
import Trending from './pages/Trending';
import Bookmarks from './pages/Bookmarks';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Comments from './pages/Comments';
import Earnings from './pages/Earnings';
import Pages from './pages/Pages';
import Settings from './pages/Settings';
import Layout from './pages/Layout';
import Theme from './pages/Theme';
import ReadingList from './pages/ReadingList';
import { onAuthChange } from './firebase/auth';
import { getAllPosts, createPost, updatePost, deletePost, incrementViews, toggleLike, toggleBookmark } from './firebase/firestore';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const currentUser = user?.uid || null;

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        loadPosts();
      } else {
        setPosts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadPosts = async () => {
    const { posts: fetchedPosts, error } = await getAllPosts();
    if (error) {
      showToast('Error loading posts: ' + error, 'error');
    } else {
      setPosts(fetchedPosts);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    showToast(`Switched to ${!isDarkMode ? 'dark' : 'light'} mode`, 'success');
  };

  const handleCreatePost = async (newPost) => {
    if (!user) {
      showToast('Please login to create posts', 'error');
      return;
    }
    
    const slug = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const postWithDefaults = {
      ...newPost,
      slug,
      excerpt: newPost.content.substring(0, 150) + '...',
      authorId: user.uid,
      authorEmail: user.email,
      author: newPost.author || user.email,
      category: newPost.category || "General",
      tags: Array.isArray(newPost.tags) ? newPost.tags : ["blog", "post"],
      status: "published",

      views: 0,
      comments: []
    };
    
    const { id, error } = await createPost(postWithDefaults);
    if (error) {
      showToast('Error creating post: ' + error, 'error');
    } else {
      showToast('Post created successfully!', 'success');
      await loadPosts();
    }
  };

  const handleUpdatePost = async (updatedPost) => {
    const slug = updatedPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const postWithUpdates = {
      ...updatedPost,
      slug,
      excerpt: updatedPost.content.substring(0, 150) + '...',
      updatedAt: new Date().toISOString()
    };
    
    const { error } = await updatePost(updatedPost.id, postWithUpdates);
    if (error) {
      showToast('Error updating post: ' + error, 'error');
    } else {
      showToast('Post updated successfully!', 'success');
      await loadPosts();
    }
  };

  const handleDeletePost = async (postId) => {
    // Optimistically remove from UI first
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    
    const { error } = await deletePost(postId);
    if (error) {
      showToast('Error deleting post: ' + error, 'error');
      // Revert the optimistic update by reloading posts
      await loadPosts();
    } else {
      showToast('Post deleted successfully!', 'success');
    }
  };

  const handleSubscribe = (email) => {
    showToast('Successfully subscribed to newsletter!', 'success');
  };



  const handleAddComment = async (postId, comment) => {
    const newComment = {
      id: Date.now(),
      content: comment.content,
      authorName: comment.authorName,
      authorId: currentUser,
      postId,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    
    const post = posts.find(p => p.id === postId);
    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), newComment]
    };
    
    const { error } = await updatePost(postId, updatedPost);
    if (error) {
      showToast('Error adding comment: ' + error, 'error');
    } else {
      loadPosts();
      showToast('Comment added!', 'success');
    }
  };

  const handleViewPost = async (postId) => {
    const { error } = await incrementViews(postId);
    if (error) {
      showToast('Error updating views: ' + error, 'error');
    } else {
      loadPosts(); // Reload to get updated view count
    }
  };





  return (
    <Router>
      <ScrollToTop />
      <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <Navbar 
          onSearch={handleSearch}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          user={user}
          showToast={showToast}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                posts={posts} 
                onDeletePost={handleDeletePost}
                onViewPost={handleViewPost}
                showToast={showToast}
                searchQuery={searchQuery}
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/create" 
            element={
              <CreatePost 
                onCreatePost={handleCreatePost}
                showToast={showToast}
              />
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <EditPost 
                posts={posts}
                showToast={showToast}
              />
            } 
          />
          <Route 
            path="/login" 
            element={<Login showToast={showToast} />} 
          />
          <Route 
            path="/categories" 
            element={<Categories posts={posts} />} 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
          <Route 
            path="/contact" 
            element={<Contact showToast={showToast} />} 
          />
          <Route 
            path="/post/:slug" 
            element={
              <PostView 
                posts={posts}
                onViewPost={handleViewPost}
                onAddComment={handleAddComment}
                showToast={showToast}
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/category/:categoryName" 
            element={
              <Category 
                posts={posts}
                onDeletePost={handleDeletePost}
                showToast={showToast}
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/trending" 
            element={
              <Trending 
                posts={posts}
                onDeletePost={handleDeletePost}
                showToast={showToast}
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/bookmarks" 
            element={
              <Bookmarks 
                posts={posts}
                onDeletePost={handleDeletePost}
                showToast={showToast}
                currentUser={currentUser}
              />
            } 
          />

          <Route 
            path="/search" 
            element={
              <Search 
                posts={posts}
                onDeletePost={handleDeletePost}
                showToast={showToast}
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                posts={posts}
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <Analytics 
                posts={posts}
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/comments" 
            element={
              <Comments 
                posts={posts}
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="/earnings" 
            element={<Earnings />} 
          />
          <Route 
            path="/pages" 
            element={<Pages />} 
          />
          <Route 
            path="/settings" 
            element={<Settings />} 
          />
          <Route 
            path="/layout" 
            element={<Layout />} 
          />
          <Route 
            path="/theme" 
            element={
              <Theme 
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
            } 
          />
          <Route 
            path="/reading-list" 
            element={<ReadingList />} 
          />
        </Routes>

        <Footer onSubscribe={handleSubscribe} />

        {toast && (
          <Toast 
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </div>
    </Router>
  );
};

export default App;