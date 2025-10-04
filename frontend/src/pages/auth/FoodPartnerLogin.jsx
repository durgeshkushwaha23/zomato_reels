import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../axios/Axios';
import '../../styles/auth-shared.css';

const FoodPartnerLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <h1 id="partner-login-title" className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>

        <form className="auth-form" noValidate onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setSuccess(null);
          try {
            await Axios.post('/auth/food-partner/login', {
              email: form.email,
              password: form.password
            });
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
              navigate('/create-food');
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
              placeholder="business@example.com" 
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
              placeholder="Password" 
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
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
