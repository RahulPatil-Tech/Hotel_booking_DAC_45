import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const EditListing = ({ listing, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    availability: false,
    capacity: 0,
    price: 0,
    image: null,       // new file
    category: '',
    imageUrl: '',      // existing URL
  });

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || '',
        description: listing.description || '',
        availability: listing.availability || false,
        capacity: listing.capacity || 0,
        price: listing.price || 0,
        image: null,
        imageUrl: listing.image || '',
        category: listing.category || '',
      });
    }
  }, [listing]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        imageUrl: URL.createObjectURL(files[0]), // preview
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listing || !listing.id) {
      alert('Listing ID is missing.');
      return;
    }

    try {
      let response;

      if (formData.image) {
        // Case: image is being updated
        const payload = new FormData();
        payload.append('title', formData.title);
        payload.append('description', formData.description);
        payload.append('availability', formData.availability ? 1 : 0);
        payload.append('capacity', formData.capacity);
        payload.append('price', formData.price);
        payload.append('category', formData.category);
        payload.append('image', formData.image);

        response = await axios.put(
          `http://localhost:8080/listing/update/${listing.id}`,
          payload,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
      } else {
        // Case: no image update
        response = await axios.put(
          `http://localhost:8080/listing/update/${listing.id}`,
          {
            title: formData.title,
            description: formData.description,
            availability: formData.availability ? 1 : 0,
            capacity: formData.capacity,
            price: formData.price,
            category: formData.category,
            image: formData.imageUrl, // retain old
          }
        );
      }

      alert(response.data.message || 'Listing updated!');
      onUpdateSuccess(listing.id);
      onClose();
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      alert('Failed to update listing.');
    }
  };

  return (
    <motion.div
      onClick={onClose}
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <motion.form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="edit-listing-form"
        initial={{ scale: 0.8, y: -50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          width: '400px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>
          Edit Listing
        </h3>

        {/* Image preview */}
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Preview"
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x180?text=No+Image';
            }}
          />
        )}

        {[{ label: 'Title', name: 'title', type: 'text' },
          { label: 'Description', name: 'description', type: 'textarea' },
          { label: 'Capacity', name: 'capacity', type: 'number' },
          { label: 'Price', name: 'price', type: 'number' },
          { label: 'Category', name: 'category', type: 'text' },
          { label: 'Image File', name: 'image', type: 'file' }
        ].map(({ label, name, type }) => (
          <label key={name} style={{ fontWeight: '500' }}>
            {label}:
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'image'}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  minHeight: '80px'
                }}
              />
            ) : type === 'file' ? (
              <input
                type="file"
                name={name}
                accept="image/*"
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />
            )}
          </label>
        ))}

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
          <span>Available</span>
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(to right, #4CAF50, #2E7D32)',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              flex: 1,
              marginRight: '10px'
            }}
          >
            Update
          </motion.button>
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: '#f1f1f1',
              color: '#333',
              padding: '10px 20px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              flex: 1
            }}
          >
            Cancel
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default EditListing;
