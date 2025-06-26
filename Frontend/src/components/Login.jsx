import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'explorer',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (!['admin', 'explorer', 'host'].includes(formData.role)) {
      errors.role = 'Invalid role selected';
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    try {
      const endpoint = `http://localhost:8080/${formData.role}/signin`;
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      login(formData.email, formData.password, formData.role);

      toast.success('Login Successful!', { position: 'top-right' });

      if (formData.role === 'explorer') {
        navigate('/explorer/home');
      } else if (formData.role === 'host') {
        navigate('/host/home');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Login failed! Please check your credentials.', { position: 'top-right' });
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 col-lg-4">
        <div
          className="card p-4 shadow-lg border-0"
          style={{
            borderRadius: '1.5rem',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 className="text-center fw-bold mb-2 text-primary">Login</h2>
          <p className="text-center text-muted mb-4">
            New here?{' '}
            <Link to="/signup" className="text-decoration-none text-primary fw-semibold">
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Login as</label>
              <select
                name="role"
                className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="explorer">Explorer</option>
                <option value="host">Host</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <div className="invalid-feedback">{errors.role}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold py-2"
              style={{ borderRadius: '30px' }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
