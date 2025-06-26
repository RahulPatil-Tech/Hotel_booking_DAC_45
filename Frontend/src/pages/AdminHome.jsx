import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminHome = () => {
  const navigate = useNavigate();


  const handleViewHosts = () => {
    navigate('/admin/view-hosts');
  };

  const handleViewExplorers = () => {
    navigate('/admin/view-explorers');
  };

  const backgroundStyle = {
    height: '80vh',
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '20px',
    backgroundImage:
      'url(/admin.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '30px',
    boxShadow: '0 8px 15px rgba(0,0,0,0.5)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    
    <div style={backgroundStyle}>
      <div className="admin-glass">
        <h1 className="mb-4">Welcome Admin!</h1>
        <p className="lead mb-4">Manage the community of hosts and explorers</p>

        <div className="d-flex justify-content-center gap-4">
          <button className="admin-btn" onClick={handleViewHosts}>
            List of Hosts
          </button>
          <button className="admin-btn" onClick={handleViewExplorers}>
            List of Explorers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
