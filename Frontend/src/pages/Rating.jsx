import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const location = useLocation();
  const { listing } = location.state || {};

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      toast.error('Please fill in both rating and comment!');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  return (
    <div
      className="rating-page container mt-5 p-4 rounded shadow"
      style={{
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 className="text-center mb-4" style={{ fontWeight: '700', color: '#333' }}>
        Rate {listing?.title || 'Us'}
      </h2>

      <div className="mb-3 text-center" aria-label="Star rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: '3rem',
              cursor: 'pointer',
              color: star <= (hover || rating) ? '#fbbc04' : '#ddd',
              transition: 'color 0.2s ease-in-out, transform 0.15s ease',
              userSelect: 'none',
              transform: star <= (hover || rating) ? 'scale(1.2)' : 'scale(1)',
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setRating(star);
            }}
            aria-label={`${star} star`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ resize: 'none', fontSize: '1.1rem' }}
      ></textarea>

      <div className="d-grid">
        <button className="btn btn-primary btn-lg fw-semibold" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>

      {submitted && (
        <div className="alert alert-success mt-4" role="alert">
          <h5>Thank you for your feedback!</h5>
          <p>
            <strong>Rating:</strong> {rating} star{rating > 1 ? 's' : ''}
          </p>
          <p>
            <strong>Comment:</strong> {comment}
          </p>
        </div>
      )}

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
}
