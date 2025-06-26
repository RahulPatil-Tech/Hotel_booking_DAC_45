import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/city-svg.svg';

const Navbar = () => {
  const { credentials, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const handleHomeClick = () => {
    if (credentials?.role === 'explorer') {
      navigate('/explorer/home');
    } else if (credentials?.role === 'host') {
      navigate('/host/home');
    } else if (credentials?.role === 'admin') {
      navigate('/admin/home');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg px-4 shadow-sm"
        style={{
          backgroundImage: 'linear-gradient(to right, #edc29e, #adc8cb)',
          height: 'max-content',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="container-fluid">
                  <Link className="navbar-brand fw-bold fs-4 text-primary d-flex align-items-center" to="/">
                    <img
                      src={logo}
                      alt="CityExplorer Logo"
                      style={{ height: '30px', marginRight: '10px' }}
                    />
                    CityExplorer
                  </Link>

          <div className="d-flex align-items-center ms-auto">
            {/* Dynamic Home Button */}
            <button
              className="btn btn-link nav-link me-3 fw-semibold text-secondary"
              style={{ textDecoration: 'none' }}
              onClick={handleHomeClick}
            >
              Home
            </button>

            <Link
              className="nav-link me-3 fw-semibold text-secondary"
              to="/aboutus"
              style={{ textDecoration: 'none' }}
            >
              About Us
            </Link>
            <Link
              className="nav-link me-3 fw-semibold text-secondary"
              to="/contactus"
              style={{ textDecoration: 'none' }}
            >
              Contact Us
            </Link>

            {/* Profile Circle with Dropdown */}
            <div className="position-relative" ref={dropdownRef}>
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{
                  width: '42px',
                  height: '42px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
                title="Profile"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {credentials?.email?.charAt(0).toUpperCase() || 'U'}
              </div>

              {showDropdown && (
                <div
                  className="position-absolute end-0 mt-2 py-2 bg-white border rounded shadow-lg"
                  style={{ zIndex: 1050, minWidth: '160px' }}
                >
                  {!credentials?.email ? (
                    <>
                      <Link
                        to="/login"
                        className="dropdown-item px-4 py-2 text-primary fw-semibold"
                        onClick={() => setShowDropdown(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="dropdown-item px-4 py-2 text-primary fw-semibold"
                        onClick={() => setShowDropdown(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <button
                      className="dropdown-item px-4 py-2 text-danger fw-semibold"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Navbar;
