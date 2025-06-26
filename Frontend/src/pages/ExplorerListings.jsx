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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Listings in "{category.replace('_', ' ')}"</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {listings.map((listing) => (
          <div className="col" key={listing.id}>
            <Link to={`/listing/details/${listing.id}`} className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm">
                <img src={listing.imageUrl} className="card-img-top" alt={listing.title} />
                <div className="card-body">
                  <h5 className="card-title">{listing.title}</h5>
                  <p className="card-text">{listing.description.slice(0, 60)}...</p>
                  <p className="card-text fw-bold">₹{listing.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorerListings;
