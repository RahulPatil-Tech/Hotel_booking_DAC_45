import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/Gradient.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'explorer',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const endpoint = `http://localhost:8080/${formData.role}/signin`;
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      // Save to auth context
      login(formData.email, formData.password, formData.role);

      toast.success('Login Successful! Redirecting...');

      // Delay navigation slightly to show toast
      setTimeout(() => {
        if (formData.role === 'explorer') {
          navigate('/explorer/home');
        } else if (formData.role === 'host') {
          navigate('/host/home');
        } else if (formData.role === 'admin') {
          navigate('/admin/home');
        } else {
          navigate('/');
        }
      }, 1500);
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Login failed! Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <div className="col-md-5" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card p-5 shadow-lg" style={{ borderRadius: '15px' }}>
          <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>
          <p className="text-center mb-4">
            Need an account?{' '}
            <Link to="/signup" className="text-decoration-none fw-semibold" style={{ color: '#764ba2' }}>
              Sign Up
            </Link>
          </p>
          <form onSubmit={handleLogin} noValidate>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-4">
              <select
                name="role"
                className={`form-select form-select-lg ${errors.role ? 'is-invalid' : ''}`}
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
              className="btn btn-gradient btn-lg w-100 fw-bold"
              disabled={loading}
              style={{ background: 'linear-gradient(45deg, #764ba2, #667eea)', border: 'none', color: 'white' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
