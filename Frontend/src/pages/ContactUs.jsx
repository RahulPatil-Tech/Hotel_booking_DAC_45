import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

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
      setSuccessMsg('Thank you for contacting us! We’ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setSuccessMsg('');
    }
  };

  return (
    <motion.div
      className="container py-5"
      style={{ maxWidth: '600px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-center mb-4 fw-bold"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        Contact Us
      </motion.h2>

      {successMsg && (
        <motion.div
          className="alert alert-success text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {successMsg}
        </motion.div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="p-4 shadow rounded-4 bg-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        noValidate
      >
        {/* Name Field */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            name="name"
            id="nameInput"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <label htmlFor="nameInput">Name</label>
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            id="emailInput"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <label htmlFor="emailInput">Email</label>
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Message Field */}
        <div className="form-floating mb-4">
          <textarea
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            name="message"
            id="messageInput"
            style={{ height: '150px' }}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here"
          ></textarea>
          <label htmlFor="messageInput">Message</label>
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn btn-primary w-100 py-2 fw-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ContactUs;
