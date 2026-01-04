import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="home">
      <header className="header">
        <div className="logo">FoodLoop</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/login/user">Login</Link>
          <Link to="/register/user">Register</Link>
        </nav>
        <div className="header-toggle">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to FoodLoop</h1>
          <p>Discover amazing food experiences from our trusted partners.</p>
          <div className="cta-buttons">
            <Link to="/login/user" className="btn primary">Get Started</Link>
            <Link to="/login/foodpartner" className="btn secondary">Join as Partner</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Placeholder for image */}
          <div className="image-placeholder">🍽️</div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>🍴 Authentic Reviews</h3>
            <p>Read genuine reviews from real food lovers.</p>
          </div>
          <div className="feature">
            <h3>👨‍🍳 Partner Network</h3>
            <p>Connect with top food partners in your area.</p>
          </div>
          <div className="feature">
            <h3>📱 Easy to Use</h3>
            <p>Simple interface for browsing and reviewing.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 FoodReview. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;