import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { credentials } = useAuth();

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/listing/details/${id}`);
        setListing(res.data);
      } catch (err) {
        toast.error('Failed to load listing details');
        console.error('Failed to load listing details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleBooking = async () => {
    if (!credentials?.email || !credentials?.password) {
      toast.warn('Please login first to make a booking');
      navigate('/login');
      return;
    }

    if (guestCount < 1) {
      toast.error('Number of guests must be at least 1');
      return;
    }

    const payload = {
      email: credentials.email,
      password: credentials.password,
      listingId: listing.id,
      noOfGuests: parseInt(guestCount, 10),
    };

    try {
      await axios.post('http://localhost:8080/api/bookings/create', payload);
      toast.success('Booking confirmed!');
      setShowBookingModal(false);
      navigate('/explorer/bookings');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      console.error('Booking failed:', error);
    }
  };

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status" aria-label="Loading">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!listing) return <div className="text-center mt-5">Listing not found.</div>;

  return (
    <div className="container mt-5 d-flex flex-column flex-lg-row align-items-start gap-4">
      {/* Left Image */}
      <img
        src={listing.image ? `/${listing.image}` : '/Khushi_photo.JPG'}
        alt={listing.title}
        className="img-fluid rounded shadow"
        style={{ maxWidth: '450px', width: '100%', objectFit: 'cover' }}
      />

      {/* Right Info */}
      <div className="flex-grow-1">
        <h2 className="mb-3">{listing.title}</h2>
        <p className="mb-4">{listing.description}</p>
        <h4 className="text-success mb-4">{formatter.format(listing.price)}</h4>

        <div className="d-flex gap-3">
          <button
            className="btn btn-primary px-4 py-2"
            onClick={() => setShowBookingModal(true)}
            style={{ fontWeight: '600', fontSize: '1.1rem' }}
          >
            Book
          </button>
          <button
            className="btn btn-outline-secondary px-4 py-2"
            onClick={() => navigate('/listing/rate')}
            style={{ fontWeight: '600', fontSize: '1.1rem' }}
          >
            Rate Us
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Book "{listing.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="guestCount" className="form-label fw-semibold">
              No. of Guests:
            </label>
            <input
              id="guestCount"
              type="number"
              className="form-control"
              min="1"
              value={guestCount}
              onChange={(e) => setGuestCount(Math.max(1, e.target.value))}
            />
          </div>
          <div>
            <label className="form-label fw-semibold">Total Price:</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={formatter.format(guestCount * listing.price)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ListingDetails;
