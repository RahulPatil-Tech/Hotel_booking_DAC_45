import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: 'linear-gradient(to right, #edc29e, #adc8cb)',
        boxShadow: '0 -4px 15px rgba(173, 200, 203, 0.6)',
        padding: '1.5rem 0',
        color: '#333',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div className="container text-center">
        <div className="mb-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={iconStyle}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            style={iconStyle}
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={iconStyle}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={iconStyle}
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <small style={{ fontWeight: '600' }}>
          &copy; {new Date().getFullYear()} CityExplorer. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

const iconStyle = {
  margin: '0 10px',
  fontSize: '1.3rem',
  color: '#333',
  transition: 'color 0.3s ease',
  cursor: 'pointer',
  textDecoration: 'none',
};

export default Footer;
