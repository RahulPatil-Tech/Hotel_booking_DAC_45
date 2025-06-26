import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddListing from './AddListing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GettingStarted = ({ email, password }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const handleViewListings = () => {
    navigate('/listing/view');
  };

  // Example toast trigger (call this wherever needed)
  const notifySuccess = () => toast.success("Listing added successfully!");

  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          height: '80vh',
          maxWidth: '1200px',
          margin: '30px auto',
          padding: '20px',
          backgroundImage: 'url(/host.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '30px',
          boxShadow: '0 8px 15px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          position: 'relative',
          color: 'white',
          userSelect: 'none',
        }}
      >
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
            width: '70%',
            padding: '22px 0',
            marginBottom: '30px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #4a90e2 0%, #357ABD 100%)',
            color: 'white',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '1.9rem',
            boxShadow: '0 8px 20px rgba(53, 122, 189, 0.6)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(53, 122, 189, 0.8)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(53, 122, 189, 0.6)';
          }}
        >
          Add Listing &rarr;
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
            width: '70%',
            padding: '22px 0',
            borderRadius: '15px',
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '1.9rem',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 6px 18px rgba(255,255,255,0.3)',
            transition: 'background-color 0.3s ease, border 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255,255,255,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(255,255,255,0.3)';
          }}
        >
          View Listings &rarr;
        </div>

        {/* Add Listing Modal */}
        {showAddModal && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              animation: 'fadeIn 0.3s ease',
            }}
            onClick={closeAddModal} // close modal on outside click
          >
            <div
              style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '30px',
                borderRadius: '15px',
                width: '90%',
                maxWidth: '650px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                position: 'relative',
              }}
              onClick={e => e.stopPropagation()} // prevent close on inside click
            >
              {/* Close Button */}
              <button
                onClick={closeAddModal}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  color: '#333',
                }}
                aria-label="Close modal"
              >
                &times;
              </button>

              <AddListing
                email={email}
                password={password}
                onClose={closeAddModal}
                onSuccess={() => {
                  closeAddModal();
                  notifySuccess();
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }
        `}
      </style>
    </>
  );
};

export default GettingStarted;
