import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import logo from '../assets/city-svg.svg';

const Navbar = () => {
  const { credentials, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/login');
  };

  const handleHomeClick = () => {
    if (credentials?.role === 'explorer') {
      navigate('/explorer/home');
    } else if (credentials?.role === 'host') {
      navigate('/host/home');
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = (path) =>
    `nav-link mx-2 fw-semibold ${location.pathname === path
      ? 'text-primary border-bottom border-2 border-primary'
      : 'text-dark'
    }`;

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-2 shadow-sm sticky-top"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        zIndex: 999,
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
          <button
            className="btn btn-link fw-semibold mx-2 text-decoration-none"
            onClick={handleHomeClick}
          >
            Home
          </button>

          <Link className={navLinkClass('/aboutus')} to="/aboutus">
            About Us
          </Link>
          <Link className={navLinkClass('/contactus')} to="/contactus">
            Contact Us
          </Link>

          {/* Profile Icon */}
          <div className="position-relative ms-3" ref={dropdownRef}>
            <div
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center shadow"
              style={{
                width: '42px',
                height: '42px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
              }}
              onClick={() => setShowDropdown((prev) => !prev)}
              title="Profile"
            >
              {credentials?.email?.charAt(0).toUpperCase() || <FaUserCircle size={20} />}
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div
                className="position-absolute end-0 mt-2 py-2 bg-white border rounded shadow-sm animate__animated animate__fadeIn"
                style={{
                  zIndex: 1000,
                  minWidth: '180px',
                  animationDuration: '0.2s',
                }}
              >
                {!credentials.email ? (
                  <>
                    <Link
                      to="/login"
                      className="dropdown-item d-flex align-items-center gap-2 px-4 py-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaSignInAlt /> Login
                    </Link>
                    <Link
                      to="/signup"
                      className="dropdown-item d-flex align-items-center gap-2 px-4 py-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaUserPlus /> Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 px-4 py-2 text-start w-100"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
