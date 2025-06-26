import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        alert('Failed to fetch bookings. Please login again.');
        navigate('/login');
      }
    };

    if (credentials.email && credentials.password) {
      fetchBookings();
    }
  }, [credentials, navigate]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Bookings</h2>
      <div className="row">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking.id}>
              <div className="card shadow-sm p-3">
                <h5>Booking ID: {booking.id}</h5>
                <p><strong>Title:</strong> {booking.title}</p>
                <p><strong>Total:</strong> ₹{booking.total}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No bookings found.</p>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate('/explorer/home')}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Bookings;
