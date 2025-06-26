import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ListingsByCategory = () => {
  const { category } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/listing/categories/${category}`);
        setListings(response.data);
        setError('');
      } catch (err) {
        setError('❌ Failed to fetch listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category]);

  if (loading) return <div className="text-center mt-5 fs-4 text-muted">Loading listings...</div>;
  if (error) return <div className="alert alert-danger mt-5 text-center">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-capitalize text-center fw-bold display-6">
        Discover "{category}" Listings
      </h2>

      {listings.length === 0 ? (
        <p className="text-center fs-5 text-muted">No listings found in this category.</p>
      ) : (
        <div className="row">
          {listings.map((listing) => (
            <div key={listing.id} className="col-md-6 col-lg-4 mb-4">
              <Link to={`/listing/details/${listing.id}`} className="text-decoration-none">
                <div
                  className="card h-100 border-0 shadow-lg listing-card"
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <img
                      src={listing.image ? `/${listing.image}` : '/Khushi_photo.JPG'}
                      alt={listing.title}
                      className="card-img-top"
                      style={{
                        height: '220px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </div>
                  <div
                    className="card-body text-dark d-flex flex-column"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.75)',
                      backdropFilter: 'blur(10px)',
                      borderTop: '1px solid rgba(0,0,0,0.1)',
                      minHeight: '180px',
                    }}
                  >
                    <h5 className="card-title fw-semibold">{listing.title}</h5>
                    <p
                      className="card-text text-secondary small flex-grow-1"
                      style={{ lineHeight: '1.4' }}
                    >
                      {listing.description.length > 100
                        ? listing.description.substring(0, 100) + '...'
                        : listing.description}
                    </p>
                    <div className="mt-2">
                      <span className="fw-bold text-primary">₹{listing.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsByCategory;
