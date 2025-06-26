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

  return (
    <div className="admin-bg">
      <div className="admin-glass animate-in">
        <h1 className="admin-title mb-3">👋 Welcome, Admin</h1>
        <p className="admin-subtitle mb-4">Manage your hosts and explorers easily</p>

        <div className="admin-button-group">
          <button className="admin-btn" onClick={handleViewHosts}>
            🧑‍💼 List of Hosts
          </button>
          <button className="admin-btn" onClick={handleViewExplorers}>
            🌍 List of Explorers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
