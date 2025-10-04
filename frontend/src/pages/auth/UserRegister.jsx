import React, { useState } from 'react';
import Axios from '../../axios/Axios';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const naviagate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-register-title">
        <header>
          <h1 id="user-register-title" className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join to explore and enjoy delicious meals.</p>
        </header>

        <nav className="auth-alt-action" style={{ marginTop: '-4px' }}>
          <strong style={{ fontWeight: 600 }}>Switch:</strong>{' '}
          <Link to="/user/register">User</Link> • <Link to="/food-partner/register">Food partner</Link>
        </nav>

        <form className="auth-form" noValidate onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setSuccess(null);
          try {
            const fullName = form.firstName + ' ' + form.lastName;
            const res = await Axios.post('/auth/user/register', {
              fullName,
              email: form.email,
              password: form.password
            });
            setSuccess('User registered successfully!');

            setForm({ firstName: '', lastName: '', email: '', password: '' });
            naviagate("/")
          } catch (err) {
            setError(err?.response?.data?.message || 'Registration failed');
          }
        }}>
          <div className="two-col">
            <div className="field-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                id="firstName" 
                name="firstName" 
                placeholder="Jane" 
                autoComplete="given-name"   
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                id="lastName" 
                name="lastName" 
                placeholder="Doe" 
                autoComplete="family-name" 
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

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
              autoComplete="new-password" 
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          <button className="auth-submit" type="submit">Sign Up</button>
          {error && <div style={{color:'red', marginTop:'8px'}}>{error}</div>}
          {success && <div style={{color:'green', marginTop:'8px'}}>{success}</div>}
        </form>

        <div className="auth-alt-action">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
