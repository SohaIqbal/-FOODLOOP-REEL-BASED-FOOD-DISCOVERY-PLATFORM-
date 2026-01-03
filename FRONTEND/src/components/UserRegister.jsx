import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate=useNavigate();
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     password: ''
//   });

  const[fullname, setFullname]=useState('');
  const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');

    console.log(fullname,email,password);


//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/api/auth/user/register',{
            fullname,
            email,
            password
        },{
            withCredentials: true  // to save cookies in browser
        });
        response.data;
         navigate('/hero');
        if (response.status === 200) {
            alert('Registration successful!', response.data);
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
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" name="fullname" value={fullname} onChange={(e)=>{
            setFullname(e.target.value);
          }} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={email} onChange={(e) =>{
            setEmail(e.target.value);
          }} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={password} onChange={(e) =>{
            setPassword(e.target.value);
          }} required />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="link">
        <Link to="/login/user">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default UserRegister;