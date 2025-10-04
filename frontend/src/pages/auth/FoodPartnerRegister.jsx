import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../axios/Axios';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';

const FoodPartnerRegister = () => {
  const [form, setForm] = useState({
    name: '',
    contactName: '',
    phone: '',
    email: '',
    password: '',
    address: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-register-title">
        <header>
          <h1 id="partner-register-title" className="auth-title">Partner sign up</h1>
          <p className="auth-subtitle">Grow your business with our platform.</p>
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
            await Axios.post('/auth/food-partner/register', {
              name: form.name,
              contactName: form.contactName,
              phone: form.phone,
              email: form.email,
              password: form.password,
              address: form.address
            });
            setSuccess('Partner registered successfully! Redirecting...');
            setTimeout(() => {
              navigate('/create-food');
            }, 700);
          } catch (err) {
            setError(err?.response?.data?.message || 'Registration failed');
          }
        }}>
          <div className="field-group">
            <label htmlFor="name">Business Name</label>
            <input
              id="name"
              name="name"
              placeholder="Tasty Bites"
              autoComplete="organization"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="two-col">
            <div className="field-group">
              <label htmlFor="contactName">Contact Name</label>
              <input
                id="contactName"
                name="contactName"
                placeholder="Jane Doe"
                autoComplete="name"
                value={form.contactName}
                onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                placeholder="+1 555 123 4567"
                autoComplete="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
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
              placeholder="Create password"
              autoComplete="new-password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              autoComplete="street-address"
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
              required
            />
            <p className="small-note">Full address helps customers find you faster.</p>
          </div>

          <button className="auth-submit" type="submit">Create Partner Account</button>
          {error && <div style={{color:'red', marginTop:'8px'}}>{error}</div>}
          {success && <div style={{color:'green', marginTop:'8px'}}>{success}</div>}
        </form>

        <div className="auth-alt-action">
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
