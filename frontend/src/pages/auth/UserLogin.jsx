import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../axios/Axios';
import '../../styles/auth-shared.css';

const UserLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>

        <form className="auth-form" noValidate onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setSuccess(null);
          try {
            const res = await Axios.post('/auth/user/login', {
              email: form.email,
              password: form.password
            });
            setSuccess('Login successful!');
            setForm({ email: '', password: '' });
            setTimeout(() => {
              navigate('/');
            }, 700);
          } catch (err) {
            setError(err?.response?.data?.message || 'Login failed');
          }
        }}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="you@example.com" 
              autoComplete="email" 
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              autoComplete="current-password" 
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          <button className="auth-submit" type="submit">Sign In</button>
          {error && <div style={{color:'red', marginTop:'8px'}}>{error}</div>}
          {success && <div style={{color:'green', marginTop:'8px'}}>{success}</div>}
        </form>

        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
