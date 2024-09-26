import React, { useState } from 'react';
import './Feedback.css';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, feedback });
        setSubmitted(true);
    };

    return (
        <div className="feedback-form-container">
            <h2>Feedback Form</h2>
            {submitted ? (
                <div className="thank-you-message">
                    <h3>Thank you for your feedback!</h3>
                    <p>Your response has been recorded.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedback">Feedback:</label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
};

export default FeedbackForm;