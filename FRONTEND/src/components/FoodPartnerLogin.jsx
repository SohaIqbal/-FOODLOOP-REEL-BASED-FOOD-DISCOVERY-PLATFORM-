import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {useNavigate} from 'react-router-dom';
const FoodPartnerLogin = () => {
    const navigate = useNavigate();

  const[email, setEmail]=useState('');
  const[password, setPassword]=useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/api/foodpartner/login', {
            email,
            password
        }, {
            withCredentials: true  // to save cookies in browser
        });

        if (response.status === 200) {
            alert('Login successful!');
            navigate('/partnerhero');
        } else {
            alert(response.data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            alert(error.response.data.message || 'Login failed');
        } else {
            alert('Network error');
        }
    }
  };

  return (
    <div className="container">
      <h2>Food Partner Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="link">
        <Link to="/register/foodpartner">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;