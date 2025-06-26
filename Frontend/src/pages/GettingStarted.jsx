import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddListing from './AddListing';

const GettingStarted = ({ email, password }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const handleViewListings = () => {
    navigate('/listing/view');
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
      {/* Glass Container */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '3rem 2rem',
          borderRadius: '20px',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '700px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
          Get Started Hosting
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
          Create a new listing or explore and manage your current ones.
        </p>

        {/* Add Listing Button */}
        <div
          role="button"
          tabIndex={0}
          onClick={openAddModal}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openAddModal();
          }}
          style={{
            cursor: 'pointer',
            padding: '1rem 2rem',
            marginBottom: '1.5rem',
            borderRadius: '40px',
            background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#fff',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(0, 114, 255, 0.4)',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 114, 255, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 114, 255, 0.4)';
          }}
        >
          Add New Listing →
        </div>

        {/* View Listings Button */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleViewListings}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleViewListings();
          }}
          style={{
            cursor: 'pointer',
            padding: '1rem 2rem',
            borderRadius: '40px',
            background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#fff',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(255, 126, 95, 0.4)',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(255, 126, 95, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 126, 95, 0.4)';
          }}
        >
          View Listings →
        </div>
      </div>

      {/* Add Listing Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={closeAddModal}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '15px',
              maxWidth: '650px',
              width: '90%',
              boxShadow: '0 6px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <AddListing
              email={email}
              password={password}
              onClose={closeAddModal}
              onSuccess={closeAddModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GettingStarted;
