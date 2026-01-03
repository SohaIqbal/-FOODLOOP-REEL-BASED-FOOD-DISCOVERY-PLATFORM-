import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
    const navigate = useNavigate();

  const[name, setName]=useState('');
  const[email, setEmail]=useState('');
  const[password, setPassword]=useState('');
  const[phone, setPhone]=useState('');
  const[address, setAddress]=useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/api/foodpartner/register', {
            name,
            email,
            password,
            phone,
            address
        }, {
            withCredentials: true  // to save cookies in browser
        });

        if (response.status === 201) {
            alert('Registration successful!');
            navigate('/partnerprofile');
        } else {
            alert(response.data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            alert(error.response.data.message || 'Registration failed');
        } else {
            alert('Network error');
        }
    }
  };

  return (
    <div className="container">
      <h2>Food Partner Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <button type="submit" >Register</button>
      </form>
      <div className="link">
        <Link to="/login/foodpartner">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;