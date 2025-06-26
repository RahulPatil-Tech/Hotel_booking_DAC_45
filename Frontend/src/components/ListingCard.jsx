import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EditListing from '../pages/EditListing';
import { Pencil, Trash2 } from 'lucide-react'; // Optional: lucide-react icons

const ListingCard = ({ listing, onDeleteSuccess }) => {
  const { credentials } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/listing/delete/${listing.id}`, {
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
        if (onDeleteSuccess) onDeleteSuccess(listing.id);
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
      <div 
        className="card shadow-sm p-4 mb-4 border-0 hover-shadow transition-all"
        style={{
          borderRadius: '1rem',
          transition: '0.3s ease',
        }}
      >
        <div className="d-flex justify-content-between align-items-start flex-column flex-md-row">
          {/* LEFT: Listing Info */}
          <div style={{ flex: 1 }}>
            <h4 className="card-title mb-2 text-primary">{listing.title}</h4>
            <p className="card-text text-muted mb-2">{listing.description}</p>
            <span className="badge bg-success fs-6">₹{listing.price}</span>
          </div>

          {/* RIGHT: Action Buttons */}
          <div className="mt-3 mt-md-0 d-flex flex-row gap-2 align-items-center">
            <button
              className="btn btn-outline-warning d-flex align-items-center gap-1"
              onClick={() => setShowEdit(true)}
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              className="btn btn-outline-danger d-flex align-items-center gap-1"
              onClick={handleDelete}
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      {showEdit && (
        <EditListing
          listing={listing}
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

export default ListingCard;
