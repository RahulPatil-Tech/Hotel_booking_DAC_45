import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const categories = [
  'HISTORICAL_SITES',
  'MUSEUMS_AND_GALLERIES',
  'CHURCHES_AND_CATHEDRALS',
  'RESTAURANTS_AND_CAFES',
  'WINE_AND_VINEYARDS',
  'BEACHES',
  'SHOPPING_AREAS',
  'PARKS_AND_GARDENS',
  'THEATERS_AND_OPERA_HOUSES',
  'FESTIVALS_AND_EVENTS',
  'OUTDOOR_ADVENTURES',
];

const AddListing = ({ onClose, onSuccess }) => {
  const { credentials } = useAuth();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    capacity: '',
    image: '',
    category: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.category) errs.category = 'Category is required';
    if (!form.price || Number(form.price) <= 0) errs.price = 'Price must be positive';
    if (!form.capacity || Number(form.capacity) <= 0) errs.capacity = 'Capacity must be positive';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:8080/listing/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          email: credentials.email,
          password: credentials.password,
          availability: true,
          image: form.image || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || 'Failed to add listing'));
        return;
      }

      alert('Listing added successfully!');
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        zIndex: 1000,
        backdropFilter: 'blur(5px)',
      }}
      onClick={onClose}
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          padding: '30px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        }}
        noValidate
      >
        <h2 style={{ marginBottom: '10px', color: '#333', textAlign: 'center' }}>✨ Add a New Listing</h2>

        {[
          { label: 'Title', name: 'title', type: 'text', placeholder: 'Enter listing title' },
          { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Enter description', rows: 4 },
          { label: 'Price', name: 'price', type: 'number', placeholder: 'Enter price' },
          { label: 'Capacity', name: 'capacity', type: 'number', placeholder: 'Enter capacity' },
          { label: 'Image URL (optional)', name: 'image', type: 'text', placeholder: 'Enter image URL' },
        ].map(({ label, name, type, placeholder, rows }) => (
          <label key={name}>
            {label}
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                rows={rows}
                required={name !== 'image'}
                style={inputStyle(errors[name])}
              />
            ) : (
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                min={type === 'number' ? '0' : undefined}
                required={name !== 'image'}
                style={inputStyle(errors[name])}
              />
            )}
            {errors[name] && <small style={{ color: 'red' }}>{errors[name]}</small>}
          </label>
        ))}

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            style={inputStyle(errors.category)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          {errors.category && <small style={{ color: 'red' }}>{errors.category}</small>}
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button type="submit" style={buttonStyle('#28a745')}>
            ✅ Add Listing
          </button>
          <button type="button" onClick={onClose} style={buttonStyle('#dc3545')}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = (error) => ({
  width: '100%',
  padding: '10px',
  marginTop: '6px',
  borderRadius: '6px',
  border: error ? '1px solid red' : '1px solid #ccc',
  fontSize: '1rem',
  transition: 'border 0.3s',
  outline: 'none',
  boxSizing: 'border-box',
});

const buttonStyle = (bgColor) => ({
  padding: '10px 20px',
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 600,
  transition: 'background-color 0.3s',
});

export default AddListing;
