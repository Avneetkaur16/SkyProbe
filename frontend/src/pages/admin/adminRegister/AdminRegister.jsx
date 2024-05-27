import React, { useState } from 'react';
import planeLogo from '../../../assets/planeLogo.png'
import './adminregister.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [credentials, setCredentials] = useState({ firstName: '', lastName: '', email: '', username: '', password: '', confirm: '' })
  const navigate = useNavigate();

  const fields = [
    {
      id: 1,
      type: 'text',
      name: 'firstName',
      value: credentials.firstName,
      placeholder: 'Enter First Name',
      label: 'First Name',
      pattern: '^[a-zA-Z]{2,64}',
      required: true,
      err: 'Required'
    },
    {
      id: 2,
      type: 'text',
      name: 'lastName',
      value: credentials.lastName,
      placeholder: 'Enter Last Name',
      label: 'Last Name',
      pattern: '^[a-zA-Z]{2,64}',
      required: true,
      err: 'Required'
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      value: credentials.email,
      placeholder: 'Enter Email',
      label: 'Email',
      required: true,
      err: 'Enter a valid email'
    },
    {
      id: 4,
      name: 'username',
      type: 'text',
      value: credentials.username,
      placeholder: 'Create a username',
      label: 'Username',
      pattern: '^[a-zA-Z0-9]{8,16}',
      required: true,
      err: 'Create a valid username'
    },
    {
      id: 5,
      name: 'password',
      type: 'password',
      value: credentials.password,
      placeholder: 'Create a Password',
      label: 'Password',
      pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%&])[a-zA-Z0-9!@#$%]{8,20}$',
      required: true,
      err: 'Password must be atleast 8 characters'
    },
    {
      id: 6,
      name: 'confirm',
      type: 'password',
      value: credentials.confirm,
      placeholder: 'Confirm Password',
      label: 'Password',
      pattern: credentials.password,
      required: true,
      err: 'Passwords did not match'
    },
  ];

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { data } = await axios.post('/admin/create', credentials);
    navigate('/admin/login');
  }

  return (
    <div className='admin-register-main'>
        <div className='admin-register-logo'>
            <img src={planeLogo} alt='planeLogo' />
            <h1>SkyProbe</h1>
            <h2 style={{ color: 'navy' }}>Admin Register</h2>
        </div>
        <form className='admin-register-container'>
          {fields.map((field) => (
            <div className='admin-register-field' key={field.id}>
              <label>{field.label}</label>
              <input type={field.type} name={field.name} pattern={field.pattern} placeholder={field.placeholder} value={field.value} required={field.required} onChange={handleChange} />
              <span>{field.err}</span>
            </div>
          ))}
            <button className='admin-register-button' onClick={handleSubmit}>Create Admin</button>
        </form>
        <p>Already have an account? <a href='/admin/login'>Sign In</a></p>
    </div>
  )
}

export default AdminRegister