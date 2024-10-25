import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';
import emailjs from 'emailjs-com';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    // Initialize EmailJS with your public key
    useEffect(() => {
        emailjs.init('i6YTDCWTjjmljnbAX'); // Replace with your public key
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            name: name.trim(),
            from_email: email.trim(), // User's email
            feedback: feedback.trim(),
        };

        // Send email using EmailJS
        emailjs.send('service_8oxogjq', 'template_l755war', templateParams) // Replace with your Service ID and Template ID
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSubmitted(true);
                // Reset form fields
                setName('');
                setEmail('');
                setFeedback('');
            })
            .catch((error) => {
                console.error('FAILED...', error);
            });
    };

    const handleBackToExperiments = () => {
        navigate(-1);
    };

    return (
        <div className="feedback-form-container">
            <h2>Feedback Form</h2>
            {submitted ? (
                <div className="thank-you-message">
                    <h3>Thank you for your feedback!</h3>
                    <p>Your response has been recorded.</p>
                    <button onClick={handleBackToExperiments} className="submit-button">
                        Back to Experiments
                    </button>
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
