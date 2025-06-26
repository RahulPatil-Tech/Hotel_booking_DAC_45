import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EditListing from '../pages/EditListing';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListingCard = ({ listing, onDeleteSuccess }) => {
  const { credentials } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) return;

    setLoadingDelete(true);

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
        toast.success(data.message || 'Listing deleted!');
        if (onDeleteSuccess) onDeleteSuccess(listing.id);
      } else {
        toast.error(data.message || 'Failed to delete listing');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete listing');
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <div className="card shadow-sm p-4" style={{ borderRadius: '12px' }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {/* LEFT: Listing Info */}
          <div className="pe-3" style={{ flex: 1 }}>
            <h5 className="card-title mb-2 text-primary">{listing.title}</h5>
            <p className="card-text mb-1 text-truncate" style={{ maxWidth: '400px' }}>{listing.description}</p>
            <p className="card-text mb-1"><strong>Revenue:</strong> ₤{listing.revenue}</p>
            <p className="mb-0"><strong>Price:</strong> ₤{listing.price}</p>
          </div>

          {/* RIGHT: Buttons */}
          <div className="d-flex flex-column flex-md-row align-items-center gap-2">
            <button 
              className="btn btn-outline-warning btn-md px-4"
              onClick={() => setShowEdit(true)}
              aria-label={`Edit listing ${listing.title}`}
            >
              Edit
            </button>
            <button 
              className="btn btn-outline-danger btn-md px-4"
              onClick={handleDelete}
              disabled={loadingDelete}
              aria-label={`Delete listing ${listing.title}`}
            >
              {loadingDelete ? 'Deleting...' : 'Delete'}
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
            toast.success('Listing updated successfully!');
            // Optionally refresh or update parent state here instead of reload
            window.location.reload();
          }}
        />
      )}

      <ToastContainer
        position="top-center"
        autoClose={2500}
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

export default ListingCard;
