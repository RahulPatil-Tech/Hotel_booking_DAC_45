import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import { useAuth } from '../context/AuthContext'; // adjust path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewListings = () => {
  const [listings, setListings] = useState([]);
  const { credentials } = useAuth();
  const { email, password } = credentials || {};

  useEffect(() => {
    const fetchListings = async () => {
      if (!email || !password) {
        toast.info("Please log in to view your listings.");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:8080/listing/view`,
          { email, password }
        );
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        toast.error('Failed to load listings. Please try again.');
      }
    };

    fetchListings();
  }, [email, password]);

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-5 text-center fw-bold" style={{ color: '#2c3e50' }}>
        Your Listings
      </h2>

      <div className="row justify-content-center">
        {listings.length === 0 ? (
          <p className="text-center text-muted mt-5" style={{ fontSize: '1.2rem' }}>
            No listings found. Start by adding a new one!
          </p>
        ) : (
          listings.map((listing) => (
            <div className="col-12 mb-4" key={listing.id}>
              <ListingCard
                listing={listing}
                onDeleteSuccess={(id) =>
                  setListings((prev) => prev.filter((l) => l.id !== id))
                }
              />
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-5">
        <a
          href="/getting-started"
          className="btn btn-primary btn-lg shadow-sm"
          style={{ borderRadius: '8px' }}
        >
          + Add New Listing
        </a>
      </div>

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

export default ViewListings;
