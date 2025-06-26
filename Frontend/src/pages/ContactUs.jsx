import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.message.trim()) newErrors.message = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate sending data to backend
      toast.success('Thank you for contacting us! We’ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      toast.error('Please fix the errors before submitting.');
    }
  };

  return (
    <div
      className="container mt-5 p-4 rounded"
      style={{
        maxWidth: '600px',
        color: 'white',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      }}
    >
      <h2 className="mb-4 text-center">Contact Us</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control bg-transparent text-white ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Name <span style={{ color: '#ff6b6b' }}>*</span></label>
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control bg-transparent text-white ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email <span style={{ color: '#ff6b6b' }}>*</span></label>
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Message Field */}
        <div className="form-floating mb-4">
          <textarea
            className={`form-control bg-transparent text-white ${errors.message ? 'is-invalid' : ''}`}
            placeholder="Leave your message here"
            id="message"
            name="message"
            style={{ height: '120px' }}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="message">Description <span style={{ color: '#ff6b6b' }}>*</span></label>
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-light fw-bold"
            style={{
              boxShadow: '0 4px 15px rgba(0,201,255,0.4)',
              color: '#000',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
