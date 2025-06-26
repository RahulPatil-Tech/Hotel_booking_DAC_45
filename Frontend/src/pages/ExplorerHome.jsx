import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExplorerHome = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchCategory.trim()) {
      toast.error('Please select a category', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        theme: 'colored',
      });
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
    height: '80vh',
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '20px',
    backgroundImage:
      'url(/explorer.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '30px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'fadeIn 1s ease forwards',
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.07)',
    borderRadius: '20px',
    padding: '40px 50px',
    width: '100%',
    maxWidth: '650px',
    color: 'white',
    boxShadow: '0 8px 40px 0 rgba(31, 38, 135, 0.5)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const viewBookingsBtnStyle = {
    cursor: 'pointer',
    position: 'absolute',
    bottom: '30px',
    right: '30px',
    padding: '14px 28px',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.1rem',
    letterSpacing: '0.04em',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 40px 0 rgba(31, 38, 135, 0.5)',
    userSelect: 'none',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
  };

  return (
    <>
      <div style={backgroundStyle}>
        <div style={glassStyle}>
          <h1 className="mb-3" style={{ fontWeight: '800', fontSize: '3rem' }}>Welcome Explorer!</h1>
          <p className="lead" style={{ fontSize: '1.25rem', marginBottom: '30px', fontStyle: 'italic' }}>
            Ciao, Traveler! Your Italian adventure starts here.
          </p>

          <div className="d-flex justify-content-center mt-4" style={{ gap: '12px' }}>
            <select
              className="form-select w-50"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              style={{
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                outline: 'none',
                color: '#333',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.3s ease',
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 6px 14px rgba(0,0,0,0.15)'}
              onBlur={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/_/g, ' ')}
                </option>
              ))}
            </select>

            <button
              className="btn btn-primary"
              onClick={handleSearch}
              style={{
                borderRadius: '12px',
                padding: '12px 24px',
                fontWeight: '700',
                fontSize: '1.1rem',
                boxShadow: '0 5px 15px rgba(0,123,255,0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#0056b3';
                e.currentTarget.style.boxShadow = '0 7px 20px rgba(0, 86, 179, 0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,123,255,0.4)';
              }}
            >
              Explore
            </button>
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={handleViewBookings}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleViewBookings();
          }}
          style={viewBookingsBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.border = '2px solid transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          View Bookings
        </div>
      </div>
      <ToastContainer />
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(15px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </>
  );
};

export default ExplorerHome;
