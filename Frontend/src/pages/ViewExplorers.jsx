import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // adjust path as needed
import ListingExplorer from '../components/ListingExplorer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewExplorers = () => {
  const [explorers, setExplorers] = useState([]);
  const { credentials } = useAuth();
  const { email, password } = credentials || {};

  useEffect(() => {
    const fetchExplorers = async () => {
      if (!email || !password) {
        toast.info("Please log in to view your listings.");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:8080/admin/view-explorers`,
          { email, password }
        );
        setExplorers(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        toast.error('Failed to load listings. Please try again later.');
      }
    };

    fetchExplorers();
  }, [email, password]);

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-5 text-center fw-bold" style={{ color: '#2c3e50' }}>
        List of Explorers
      </h2>

      <div className="row justify-content-center">
        {explorers.length === 0 ? (
          <p className="text-center text-muted mt-5" style={{ fontSize: '1.2rem' }}>
            No explorers found. Try adding some!
          </p>
        ) : (
          explorers.map((explorer) => (
            <div className="col-12 mb-4" key={explorer.id}>
              <ListingExplorer
                explorer={explorer}
                onDeleteSuccess={(id) =>
                  setExplorers((prev) => prev.filter((l) => l.id !== id))
                }
              />
            </div>
          ))
        )}
      </div>

      {/* Optional Add Explorer Button */}
      {/* 
      <div className="text-center mt-4">
        <a href="/getting-started" className="btn btn-success btn-lg shadow-sm">
          + Add New Explorer
        </a>
      </div>
      */}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ViewExplorers;
