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
      const response = await fetch('http://localhost:808/listing/add', {
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '100%',
          maxWidth: '450px',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
        noValidate
      >
        <h2 style={{ marginBottom: '10px', color: '#333' }}>Add Listing</h2>

        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter listing title"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: errors.title ? '1px solid red' : '1px solid #ccc',
            }}
          />
          {errors.title && <small style={{ color: 'red' }}>{errors.title}</small>}
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter listing description"
            rows={4}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: errors.description ? '1px solid red' : '1px solid #ccc',
            }}
          />
          {errors.description && <small style={{ color: 'red' }}>{errors.description}</small>}
        </label>

        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: errors.category ? '1px solid red' : '1px solid #ccc',
              marginTop: '5px',
            }}
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

        <label>
          Price
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: errors.price ? '1px solid red' : '1px solid #ccc',
            }}
          />
          {errors.price && <small style={{ color: 'red' }}>{errors.price}</small>}
        </label>

        <label>
          Capacity
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="Enter capacity"
            min="0"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: errors.capacity ? '1px solid red' : '1px solid #ccc',
            }}
          />
          {errors.capacity && <small style={{ color: 'red' }}>{errors.capacity}</small>}
        </label>

        <label>
          Image URL (optional)
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
