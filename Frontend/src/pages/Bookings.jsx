import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Bookings.css';

const Bookings = () => {
  const { credentials } = useAuth();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.post('http://localhost:8080/api/bookings/explorer/auth', {
          email: credentials.email,
          password: credentials.password,
        });
        setBookings(res.data);
        toast.success('Bookings loaded successfully!');
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        toast.error('Failed to fetch bookings. Please login.');
        navigate('/login');
      }
    };

    if (credentials.email && credentials.password) {
      fetchBookings();
    }
  }, [credentials, navigate]);

  return (
    <div className="bookings-wrapper py-5 px-3">
      <div className="container">
        <h2 className="text-center text-white mb-5">📒 Your Bookings</h2>
        <div className="row">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div className="col-md-4 mb-4" key={booking.id}>
                <div className="booking-card p-4">
                  <h5>Booking ID: <span className="highlight">{booking.id}</span></h5>
                  <p><strong>Title:</strong> {booking.title}</p>
                  <p><strong>No of Guests:</strong> {booking.noOfGuests}</p>
                  <p><strong>Total:</strong> ₤{booking.total}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100 mt-5 text-white">
              <p className="no-booking-text">😕 No bookings found.</p>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn-glass" onClick={() => navigate('/explorer/home')}>
            ➕ Add Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
