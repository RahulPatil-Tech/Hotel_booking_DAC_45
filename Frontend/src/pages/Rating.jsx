import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const location = useLocation();
  const { listing } = location.state || {};

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      alert('Please fill in both rating and comment!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4 display-6">
          Rate <span className="text-primary">{listing?.title || 'Our Society'}</span>
        </h2>

        {/* Star Rating */}
        <div className="mb-4 text-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                fontSize: '3rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                color: star <= (hover || rating) ? '#ffc107' : '#e4e5e9',
              }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment Box */}
        <div className="mb-3">
          <textarea
            className="form-control shadow-sm"
            rows="4"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ borderRadius: '12px' }}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button
            className="btn btn-success fw-bold py-2"
            onClick={handleSubmit}
            style={{ borderRadius: '12px' }}
          >
            Submit Feedback
          </button>
        </div>

        {/* Thank You Message */}
        {submitted && (
          <div
            className="alert alert-light mt-4 shadow-sm"
            style={{
              borderRadius: '16px',
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <h5 className="fw-bold">🎉 Thank you for your feedback!</h5>
            <p>
              <strong>Rating:</strong>{' '}
              <span className="text-warning">{'★'.repeat(rating)}</span>
            </p>
            <p>
              <strong>Comment:</strong> {comment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
