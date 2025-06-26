import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const navigate = useNavigate();
  const { credentials } = useAuth();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/listing/details/${id}`);
        setListing(res.data);
      } catch (err) {
        toast.error('❌ Failed to load listing details.');
        console.error('Failed to load listing details', err);
      }
    };
    fetchListing();
  }, [id]);

  const handleBooking = async () => {
    if (!credentials?.email || !credentials?.password) {
      toast.warning('⚠️ Please log in to book this listing.');
      return;
    }

    const payload = {
      email: credentials.email,
      password: credentials.password,
      listingId: listing.id,
      noOfGuests: parseInt(guestCount, 10)
    };

    try {
      await axios.post('http://localhost:8080/api/bookings/create', payload);
      toast.success('🎉 Booking confirmed!');
      setShowBookingModal(false);
      setTimeout(() => navigate('/explorer/bookings'), 2500); // Delay to let user see toast
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  if (!listing) return <div className="text-center mt-5 fs-4 text-muted">Loading listing details...</div>;

  return (
    <div
      className="container mt-5 p-4 rounded"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        borderRadius: '20px',
        color: '#fff',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1470&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Image */}
      <img
        src={listing.image ? `/${listing.image}` : '/Khushi_photo.JPG'}
        alt={listing.title}
        className="img-fluid rounded shadow"
        style={{
          width: '100%',
          maxWidth: '500px',
          height: 'auto',
          border: '4px solid white',
          objectFit: 'cover'
        }}
      />

      {/* Listing Info */}
      <div style={{ maxWidth: '600px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '20px', borderRadius: '10px' }}>
        <h2 className="fw-bold mb-3 text-white">{listing.title}</h2>
        <p className="fs-5 mb-4 text-white" style={{ lineHeight: '1.6' }}>{listing.description}</p>
        <h4 className="text-warning mb-4">Price per Guest: ₹{listing.price}</h4>

        {/* Action Buttons */}
        <div className="d-flex gap-3">
          <button
            className="btn btn-success px-4 py-2 fw-semibold shadow"
            onClick={() => setShowBookingModal(true)}
          >
            Book Now
          </button>
          <button
            className="btn btn-outline-light px-4 py-2 fw-semibold"
            onClick={() => navigate('/listing/rate')}
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
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">Complete Your Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Number of Guests</label>
            <input
              type="number"
              min="1"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="form-label fw-semibold">Total Price</label>
            <input
              type="text"
              value={`₹${guestCount * listing.price}`}
              readOnly
              className="form-control-plaintext text-dark"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowBookingModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
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

export default ListingDetails;
