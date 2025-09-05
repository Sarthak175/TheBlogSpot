import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../firebase/auth';
import './Login.css';

const Login = ({ showToast }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        const { user, error } = await loginUser(formData.email, formData.password);
        if (error) {
          showToast(error, 'error');
        } else {
          showToast('Login successful!', 'success');
          navigate('/');
        }
      } else {
        const { user, error } = await registerUser(formData.email, formData.password);
        if (error) {
          showToast(error, 'error');
        } else {
          showToast('Registration successful!', 'success');
          navigate('/');
        }
      }
    } catch (error) {
      showToast('Authentication failed', 'error');
    }
    
    setIsSubmitting(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-content">
          <div className="auth-card">
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLogin ? 'Sign in to your account' : 'Join our community today'}</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password..."
                  required
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password..."
                    required
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary auth-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="auth-toggle">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  onClick={toggleMode}
                  className="auth-link"
                >
                  {isLogin ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;