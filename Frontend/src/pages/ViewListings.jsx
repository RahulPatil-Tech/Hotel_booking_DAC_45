import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import { useAuth } from '../context/AuthContext';
import { FaPlusCircle } from 'react-icons/fa';

const ViewListings = () => {
  const [listings, setListings] = useState([]);
  const { credentials } = useAuth();
  const { email, password } = credentials;

  useEffect(() => {
    const fetchListings = async () => {
      if (!email || !password) {
        alert("Please log in to view your listings.");
        return;
      }

      try {
        const response = await axios.post(`http://localhost:8080/listing/view`, { email, password });
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        alert('Failed to load listings');
      }
    };

    fetchListings();
  }, [email, password]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold">📋 Your Listings</h2>
        <p className="text-muted">Manage your published listings easily</p>
      </div>

      {listings.length === 0 ? (
        <div className="text-center my-5">
          <p className="lead text-muted">You have no listings yet.</p>
          <a href="/getting-started" className="btn btn-outline-primary shadow-sm">
            <FaPlusCircle className="me-2" /> Add Your First Listing
          </a>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {listings.map((listing) => (
            <div className="col-md-6 col-lg-5" key={listing.id}>
              <ListingCard
                listing={listing}
                onDeleteSuccess={(id) => setListings(listings.filter(l => l.id !== id))}
              />
            </div>
          ))}
        </div>
      )}

      {listings.length > 0 && (
        <div className="text-center mt-5">
          <a href="/getting-started" className="btn btn-success px-4 py-2 fw-bold shadow">
            <FaPlusCircle className="me-2" /> Add New Listing
          </a>
        </div>
      )}
    </div>
  );
};

export default ViewListings;
