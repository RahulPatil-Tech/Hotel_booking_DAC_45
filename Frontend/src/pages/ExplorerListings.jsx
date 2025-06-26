import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ExplorerListings = () => {
  const { category } = useParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/listing/categories/${category}`);
        setListings(res.data);
      } catch (err) {
        console.error('Error fetching listings', err);
      }
    };

    fetchListings();
  }, [category]);

  // Helper to format category nicely
  const formatCategory = (cat) =>
    cat
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ fontWeight: '700', letterSpacing: '0.05em', textTransform: 'capitalize' }}>
        Listings in "{formatCategory(category)}"
      </h2>

      {listings.length === 0 ? (
        <p className="text-center text-muted">No listings found for this category.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {listings.map((listing) => (
            <div className="col" key={listing.id}>
              <Link to={`/listing/details/${listing.id}`} className="text-decoration-none">
                <div
                  className="card h-100 shadow-sm"
                  style={{
                    borderRadius: '15px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 123, 255, 0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ fontWeight: '700', fontSize: '1.25rem', color: '#007bff' }}
                    >
                      {listing.title}
                    </h5>
                    <p
                      className="card-text"
                      style={{ color: '#444', minHeight: '3.5rem', fontSize: '0.95rem' }}
                    >
                      {listing.description.length > 80
                        ? listing.description.slice(0, 80) + '...'
                        : listing.description}
                    </p>
                    <p
                      className="card-text fw-bold"
                      style={{ color: '#198754', fontSize: '1.1rem', marginTop: 'auto' }}
                    >
                      ₹{listing.price}
                    </p>
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

export default ExplorerListings;
