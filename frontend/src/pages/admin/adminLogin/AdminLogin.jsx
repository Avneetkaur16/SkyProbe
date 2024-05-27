import React, { useState } from 'react';
import planeLogo from '../../../assets/planeLogo.png';
import './adminlogin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const navigate = useNavigate();

  const fields = [
    {
      id: 1,
      name: 'username',
      label: 'Username',
      placeholder: 'Enter Username',
      value: credentials.username,
      pattern: '^[a-zA-Z0-9]{8,16}',
      err: 'Required',
      type: 'text',
      required: true
    },
    {
      id: 2,
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      value: credentials.password,
      pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%&])[a-zA-Z0-9!@#$%]{8,20}$',
      err: 'Required',
      type: 'password',
      required: true
    }
  ];

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    const { data } = await axios.post('/admin/login', credentials);
    localStorage.setItem("admin", JSON.stringify(data));
    navigate(`/admin/profile/${data?._id}`);
  }

  return (
    <div className='admin-login-main'>
        <div className='admin-login-logo'>
            <img src={planeLogo} alt='planeLogo' />
            <h1>SkyProbe</h1>
            <h1 style={{ color:'navy' }}>Admin Login</h1>
        </div>
        <form className='admin-login-container'>
            {fields.map((field) => (
              <div className='admin-login-field' key={field.id}>
                <label>{field.label}</label>
                <input name={field.name} value={field.value} placeholder={field.placeholder} pattern={field.pattern} type={field.type} onChange={handleChange} required={field.required} />
                <span>{field.err}</span>
              </div>
            ))}
            <button className='admin-login-button' onClick={handleLogin}>Login</button>
        </form>
        <p>Don't have an account? <a href='/admin/register'>Sign Up</a></p>
    </div>
  )
}

export default AdminLogin