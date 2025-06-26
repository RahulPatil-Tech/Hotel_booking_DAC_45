import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

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
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
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

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    try {
      const endpoint = `http://localhost:8080/${formData.role}/signup`;
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      console.log('Signup successful:', response.data);
      toast.success('Signup Successful! Please login now.');
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      toast.error('Signup failed! Please try again.');
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
          <h2 className="text-center text-primary fw-bold mb-2">Sign Up</h2>
          <p className="text-center text-muted mb-4">
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none fw-semibold text-primary">
              Login
            </Link>
          </p>

          <form onSubmit={handleSignup} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Role</label>
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
              style={{
                borderRadius: '30px',
                background: 'linear-gradient(to right, #007bff, #00c6ff)',
                border: 'none',
              }}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
