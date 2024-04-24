import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap';
import BlogNavbar from '../../components/blogs/BlogNavbar';
import BlogFooter from '../../components/blogs/BlogFooter';
import '../../assets/css/pages/newsletter/Newsletter.css';
import { useNewsletterStore } from '../../stores/index.js';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext.js';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { subscribed, subscribeToNewsletter } = useNewsletterStore();

    const navigate = useNavigate();

    const { isLoading, startLoading, stopLoading } = useLoading(); // Use the loading context

    // useEffect(() => {
    //     startLoading(); // Start loading when the component mounts
    //     return () => {
    //         stopLoading(); // Stop loading when the component unmounts
    //     };
    // }, [startLoading, stopLoading]);

    // useEffect(() => {
    //     if (!isLoading) {
    //         // All content is loaded, stop loading
    //         stopLoading();
    //     }
    // }, [isLoading, stopLoading]);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // Basic email validation
        setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
    };

    const handleSubscribe = async () => {
        try {
            startLoading(); // Start loading before making the API call
            await subscribeToNewsletter(email);
            stopLoading(); // Stop loading after the API call is completed
        } catch (error) {
            stopLoading(); // Stop loading if there's an error
            setErrorMessage(error.message); // Set error message state if error occurs
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setErrorMessage('Email address is required');
            return; // Exit early if email is empty
        }
        if (isValidEmail) {
            handleSubscribe(); // Call handleSubscribe to manage subscription logic
        }
    };

    const handleBackToHome = () => {
        navigate('/blogs');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page

    }

    return (
        <div className="newsletter-page">
            <BlogNavbar />
            <Container className='news-container'>
                <Row className="justify-content-center mt-5 ">
                    <h2 className="text-center fw-bold mb-4 ">Subscribe For Newsletter!</h2>
                    {errorMessage &&
                        <Alert
                            variant="danger"
                            className="text-center news-input-alert"
                        >
                            {errorMessage}
                        </Alert>
                    }
                    {subscribed ? (
                        <Alert variant="success" className="text-center news-input-alert">
                            Thank you for subscribing!
                        </Alert>
                    ) : (
                        <Row className='text-center news-input-row'>
                            <Form onSubmit={handleSubmit}>
                                <Row >
                                    <Col lg={2} />
                                    <Col lg={6} className='news-email-input '>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                isInvalid={!isValidEmail && email.length > 0}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a valid email address.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2} className='news-email-submit '>
                                        <Button variant="primary" type="submit" className="news-email-submit-btn">
                                            Subscribe
                                        </Button>
                                    </Col>
                                    <Col lg={2} />
                                </Row>
                            </Form>
                        </Row>
                    )}
                </Row>
                <Row>
                    <Button variant="primary" type="submit" className="back-to-home-btn" onClick={handleBackToHome}>
                        Back To Home
                    </Button>
                </Row>
            </Container>
            <BlogFooter />
        </div>
    );
};

export default Newsletter;
