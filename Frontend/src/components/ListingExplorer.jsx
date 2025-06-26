import React, { useState } from 'react';
import { useAuth } from '../../../CityExplorer_React1/CityExplorer_React/src/context/AuthContext';
import EditExplorer from '../../../CityExplorer_React1/CityExplorer_React/src/pages/EditExplorer'; // import modal

const ListingExplorer = ({ explorer, onDeleteSuccess }) => {
  const { credentials } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/admin/delete-explorer/${explorer.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Listing deleted!');
        if (onDeleteSuccess) onDeleteSuccess(explorer.id);
      } else {
        alert(data.message || 'Failed to delete listing');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete listing');
    }
  };

  return (
    <>
      <div className="card shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {/* LEFT: Listing Info */}
          <div className="pe-3" style={{ flex: 1 }}>
            <h5 className="card-title mb-2">ID: {explorer.id}</h5>
            <p className="card-text mb-1"><strong>E-mail:</strong> {explorer.email}</p>
            <p className="mb-0"><strong>Password:</strong> {explorer.password}</p>
          </div>

          {/* RIGHT: Buttons */}
          <div className="d-flex flex-column flex-md-row align-items-center gap-2">
            <button 
              className="btn btn-warning btn-md" 
              onClick={() => setShowEdit(true)}
            >
              Edit
            </button>
            <button 
              className="btn btn-danger btn-md" 
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      {showEdit && (
        <EditExplorer
          explorer={explorer}
          onClose={() => setShowEdit(false)}
          onUpdateSuccess={() => {
            setShowEdit(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
};

export default ListingExplorer;
