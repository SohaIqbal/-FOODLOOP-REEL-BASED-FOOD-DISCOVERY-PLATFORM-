import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
const UserLogin = () => {
const navigate=useNavigate();


  const[email, setEmail]=useState('');
  const[password, setPassword]=useState('');


 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/api/auth/user/login',{
           
            email,
            password
        },{
            withCredentials: true  // to send cookies from backend
        });
        response.data;
        navigate('/hero');
        if (response.status === 200) {
            alert('Login successful!', response.data);
            // Redirect to login
          } else {
            alert(response.data.message);
          }

        
    } catch (error) {
        alert('Error:', error);
        
    }
    // try {
    //   const response = await fetch('http://localhost:3000/api/auth/user/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     alert('Registration successful!');
    //     // Redirect to login
    //   } else {
    //     alert(data.message);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };
  return (
    <div className="container">
      <h2>User Login</h2>
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
        <Link to="/register/user">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default UserLogin;