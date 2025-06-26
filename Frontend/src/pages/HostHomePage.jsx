import React from 'react';
import { useNavigate } from 'react-router-dom';

const HostHomePage = () => {
  const navigate = useNavigate();

  const handleGettingStarted = () => {
    navigate('/getting-started');
  };

  return (
    <div
      style={{
        minHeight: '90vh',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Glass Card */}
      <div
        className="glass-card"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '4rem 3rem',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          textAlign: 'center',
          color: '#fff',
          maxWidth: '700px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
          Welcome, Superhost!
        </h1>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          Launch your next unforgettable stay. Easily manage your listings, track bookings, and connect with travelers across the globe.
        </p>

        {/* CTA Button */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleGettingStarted}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleGettingStarted();
            }
          }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #ff6f61, #ff9472)',
            padding: '0.85rem 2.5rem',
            fontSize: '1.25rem',
            fontWeight: '600',
            borderRadius: '40px',
            color: '#fff',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(255, 111, 97, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(255, 111, 97, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 111, 97, 0.4)';
          }}
        >
          Getting Started →
        </div>
      </div>
    </div>
  );
};

export default HostHomePage;
