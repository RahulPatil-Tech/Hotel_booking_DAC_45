import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Gradient.css'; // your existing CSS

const ListingsByCategory = () => {
  const { category } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/listing/categories/${category}`);
        setListings(response.data);
      } catch (err) {
        toast.error('Failed to fetch listings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status" aria-label="Loading">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-capitalize gradient-text" style={{ fontWeight: '700' }}>
        Listings for "{category.replace(/_/g, ' ')}"
      </h2>

      {listings.length === 0 ? (
        <p className="text-center fs-5 mt-4">No listings found in this category.</p>
      ) : (
        <div className="row g-4">
          {listings.map((listing) => (
            <div key={listing.id} className="col-md-6 col-lg-4">
              <Link
                to={`/listing/details/${listing.id}`}
                className="text-decoration-none"
                aria-label={`View details for ${listing.title}`}
              >
                <div className="card h-100 shadow-sm border-0 hover-scale">
                  <div
                    className="card-img-top overflow-hidden"
                    style={{ height: '220px', borderRadius: '15px 15px 0 0' }}
                  >
                    <img
                      src={listing.image ? `/${listing.image}` : '/Khushi_photo.JPG'}
                      alt={listing.title}
                      style={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.3s ease' }}
                      className="card-image"
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">{listing.title}</h5>
                    <p
                      className="card-text text-muted flex-grow-1"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {listing.description}
                    </p>
                    <h6 className="mt-3 text-primary fw-bold">₤{listing.price.toLocaleString()}</h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default ListingsByCategory;
