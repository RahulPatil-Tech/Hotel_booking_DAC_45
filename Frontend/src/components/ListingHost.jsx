import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EditHost from '../pages/EditHost';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListingHost = ({ host, onDeleteSuccess }) => {
  const { credentials } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this host?');
    if (!confirmDelete) return;

    setLoadingDelete(true);

    try {
      const response = await fetch(`http://localhost:8080/admin/delete-host/${host.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Host deleted successfully!');
        if (onDeleteSuccess) onDeleteSuccess(host.id);
      } else {
        toast.error(data.message || 'Failed to delete host');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete host');
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <div className="card shadow-sm p-4" style={{ borderRadius: '12px' }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {/* LEFT: Host Info */}
          <div className="pe-3" style={{ flex: 1 }}>
            <h5 className="card-title mb-2 text-primary">ID: {host.id}</h5>
            <p className="card-text mb-1"><strong>E-mail:</strong> {host.email}</p>
            <p className="mb-0"><strong>Password:</strong> {host.password}</p>
          </div>

          {/* RIGHT: Buttons */}
          <div className="d-flex flex-column flex-md-row align-items-center gap-2">
            <button
              className="btn btn-outline-warning btn-md px-4"
              onClick={() => setShowEdit(true)}
              aria-label={`Edit host ${host.email}`}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-md px-4"
              onClick={handleDelete}
              disabled={loadingDelete}
              aria-label={`Delete host ${host.email}`}
            >
              {loadingDelete ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      {showEdit && (
        <EditHost
          host={host}
          onClose={() => setShowEdit(false)}
          onUpdateSuccess={() => {
            setShowEdit(false);
            toast.success('Host updated successfully!');
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

export default ListingHost;
