import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Login = () => {
const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: 'user' // 'user' or 'foodpartner'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
   

      if (formData.type === 'user') {
           const response = await axios.post('http://localhost:3000/api/auth/user/login',{
             email: formData.email,
            password: formData.password
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

    } 
    else if (formData.type === 'foodpartner') {
 

         const response = await axios.post('http://localhost:3000/api/foodpartner/login', {
            email: formData.email,
            password: formData.password



        }, {
            withCredentials: true  // to save cookies in browser
        });



        if (response.status === 200) {
            alert('Login successful!');
            navigate('/partnerhero');
        } else {
            alert(response.data.message || 'Login failed');
        }
  }}
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Login as:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="user">User</option>
            <option value="foodpartner">Food Partner</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="link">
        <Link to="/register/user">Register as User</Link> | <Link to="/register/foodpartner">Register as Food Partner</Link>
      </div>
    </div>
  );
};

export default Login;