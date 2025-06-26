import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExplorerHome = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchCategory.trim()) {
      alert('Please select a category');
      return;
    }
    navigate(`/explorer/listings/${searchCategory}`);
  };

  const handleViewBookings = () => {
    navigate('/explorer/bookings');
  };

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

  const backgroundStyle = {
    height: '100vh',
    width: '100%',
    padding: '20px',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '20px',
    padding: '40px',
    width: '90%',
    maxWidth: '700px',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.2)',
    textAlign: 'center',
  };

  const viewBookingsBtnStyle = {
    cursor: 'pointer',
    position: 'absolute',
    bottom: '30px',
    right: '30px',
    padding: '12px 24px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    fontWeight: '600',
    fontSize: '1rem',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 0 15px rgba(255,255,255,0.3)',
    userSelect: 'none',
    transition: '0.3s ease',
    border: '2px solid transparent',
  };

  return (
    <div style={backgroundStyle}>
      <motion.div
        style={glassStyle}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ fontWeight: 700, fontSize: '2.5rem', marginBottom: '10px' }}>
          Welcome, Explorer!
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Discover amazing places and experiences.
        </p>

        <div className="d-flex justify-content-center">
          <select
            className="form-select w-50 me-2"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              backdropFilter: 'blur(5px)',
            }}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} style={{ color: '#000' }}>
                {cat.replace(/_/g, ' ')}
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              color: '#fff',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            Explore
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        role="button"
        tabIndex={0}
        onClick={handleViewBookings}
        onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleViewBookings()}
        style={viewBookingsBtnStyle}
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.6)' }}
        whileTap={{ scale: 0.95 }}
      >
        View Bookings
      </motion.div>
    </div>
  );
};

export default ExplorerHome;
