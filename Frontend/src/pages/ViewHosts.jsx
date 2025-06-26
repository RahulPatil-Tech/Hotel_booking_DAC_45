import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // adjust path as needed
import ListingHost from '../components/ListingHost';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewHosts = () => {
  const [hosts, setHosts] = useState([]);
  const { credentials } = useAuth();
  const { email, password } = credentials || {};

  useEffect(() => {
    const fetchHosts = async () => {
      if (!email || !password) {
        toast.info("Please log in to view your listings.");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:8080/admin/view-hosts`,
          { email, password }
        );
        setHosts(response.data);
      } catch (error) {
        console.error('Error fetching hosts:', error);
        toast.error('Failed to load hosts. Please try again later.');
      }
    };

    fetchHosts();
  }, [email, password]);

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-5 text-center fw-bold" style={{ color: '#34495e' }}>
        List of Hosts
      </h2>

      <div className="row justify-content-center">
        {hosts.length === 0 ? (
          <p className="text-center text-muted mt-5" style={{ fontSize: '1.2rem' }}>
            No hosts found. Try adding some!
          </p>
        ) : (
          hosts.map((host) => (
            <div className="col-12 mb-4" key={host.id}>
              <ListingHost
                host={host}
                onDeleteSuccess={(id) =>
                  setHosts((prev) => prev.filter((h) => h.id !== id))
                }
              />
            </div>
          ))
        )}
      </div>

      {/* Uncomment to enable Add New Host button */}
      {/* 
      <div className="text-center mt-4">
        <a href="/getting-started" className="btn btn-success btn-lg shadow-sm">
          + Add New Host
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

export default ViewHosts;
