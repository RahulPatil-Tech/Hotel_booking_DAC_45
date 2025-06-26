import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HostHomePage = () => {
  const navigate = useNavigate();

  const handleGettingStarted = () => {
    navigate('/getting-started');
    // Example toast (uncomment to test)
    // toast.info('Welcome! Let’s get started.');
  };

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
          position: 'relative',
          boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
          overflow: 'hidden',
          animation: 'fadeIn 0.5s ease',
          userSelect: 'none',
        }}
      >
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
            cursor: 'pointer',
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            padding: '18px 0',
            borderRadius: '25px',
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            color: 'white',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '1.9rem',
            boxShadow: '0 8px 25px rgba(101, 52, 255, 0.7)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
            border: '2px solid transparent',
            userSelect: 'none',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(101, 52, 255, 0.9)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #512fc6 0%, #1e5ed1 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(101, 52, 255, 0.7)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)';
          }}
        >
          Getting Started &rarr;
        </div>
      </div>

      {/* Toast Container */}
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

export default HostHomePage;
