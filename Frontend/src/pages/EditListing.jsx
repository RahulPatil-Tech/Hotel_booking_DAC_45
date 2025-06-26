import React, { useState } from 'react';
import axios from 'axios';

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

const formatCategory = (cat) =>
  cat
    .toLowerCase()
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

const EditListing = ({ listing, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    title: listing.title || '',
    description: listing.description || '',
    availability: listing.availability ?? true,
    capacity: listing.capacity || 0,
    price: listing.price || 0,
    image: listing.image || '',
    category: listing.category || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    // Convert capacity and price to numbers
    if (name === 'capacity' || name === 'price') {
      val = Number(val);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listing || !listing.id) {
      alert('Listing data missing. Cannot update.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/listing/update/${listing.id}`,
        formData
      );
      alert(response.data.message || 'Listing updated successfully!');
      onUpdateSuccess(listing.id);
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update listing.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '30px 40px',
          borderRadius: '10px',
          width: '600px',
          maxHeight: '80vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          textAlign: 'left',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Edit Listing</h3>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            autoFocus
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minHeight: '80px',
            }}
          />
        </label>

        <label>
          Availability:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            style={{ marginLeft: '10px' }}
          />
        </label>

        <label>
          Capacity:
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min={0}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </label>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {formatCategory(cat)}
              </option>
            ))}
          </select>
        </label>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
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
            Update
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

export default EditListing;
