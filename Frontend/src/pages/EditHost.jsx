import React, { useState } from 'react';
import axios from 'axios';

const EditHost = ({ host, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    email: host.email,
    password: host.password,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!host || !host.id) {
      alert('Host data missing. Cannot update.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/admin/update-host/${host.id}`,
        formData
      );
      alert(response.data.message || 'Host updated successfully!');
      onUpdateSuccess(host.id);
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update host.');
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
      onClick={onClose} // close modal when clicking outside form
    >
      <form
        onClick={(e) => e.stopPropagation()} // prevent closing modal on form click
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
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Edit Host</h3>

        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            autoFocus
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
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
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007bff')}
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
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#5a6268')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#6c757d')}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHost;
