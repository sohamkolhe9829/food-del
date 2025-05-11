import React, { useState } from "react";
import axios from "axios"; // ✅ Import axios
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/feedback/submit",
        {
          name,
          email,
          feedback,
          rating,
        }
      );

      if (response.data.success) {
        alert("Thank you for your feedback!");
        setName("");
        setEmail("");
        setFeedback("");
        setRating(0);
      } else {
        alert("Failed to submit feedback");
      }
    } catch (error) {
      alert("Error submitting feedback");
      console.error(error);
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>We Value Your Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Your Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us your experience..."
            rows="3"
            required
          ></textarea>
        </div>

        <div className="form-group rating-group">
          <label htmlFor="rating">Rate Us:</label>
          <div className="star-rating">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${rating > index ? "filled" : ""}`}
                onClick={() => setRating(index + 1)}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: rating > index ? "#FFD700" : "#ccc",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
