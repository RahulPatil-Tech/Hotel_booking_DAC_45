import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Gradient.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'explorer',
  });

  const [errors, setErrors] = useState({});

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

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

      // Show success toast
      setToast({ show: true, message: 'Signup Successful! Please login now.', type: 'success' });

      // Redirect after short delay so user can see toast
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Signup failed:', err);
      setToast({ show: true, message: 'Signup failed! Please try again.', type: 'danger' });
    }
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

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
      <div className="col-md-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div
          className="card p-4 shadow-lg rounded"
          style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
        >
          <h2 className="text-center mb-3 fw-bold" style={{ color: '#4b0082' }}>
            Sign Up
          </h2>
          <p className="text-center mb-4 text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-primary fw-semibold">
              Login
            </Link>
          </p>
          <form onSubmit={handleSignup} noValidate>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className={`form-control shadow-sm ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className={`form-control shadow-sm ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <select
                name="role"
                className={`form-select shadow-sm ${errors.role ? 'is-invalid' : ''}`}
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
              className="btn btn-gradient w-100 fw-bold"
              style={{ background: 'linear-gradient(90deg, #764ba2, #667eea)', color: 'white' }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`position-fixed bottom-0 end-0 m-3 alert alert-${toast.type} shadow-lg rounded`}
          style={{ minWidth: '250px', zIndex: 1055 }}
          role="alert"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Signup;
