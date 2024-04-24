import React from 'react'
import { useState } from 'react';
import '../../assets/css/blogs/BlogFooter.css';
import { Container, Row, Col, Navbar, Button, FormControl } from 'react-bootstrap'
import logoDark from '../../assets/images/logo';

const BlogFooter = () => {

    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        // Add logic to handle the subscription (e.g., send the email to the server)
        console.log(`Subscribed with email: ${email}`);
        // Clear the email input after subscription
        setEmail('');
    };
    return (
        <Navbar className='footer-container'>
            <Row className='ft-row-1'>
                <Col lg={1}></Col>
                <Col lg={6} className='ft-col-1'>
                    {/* Subscribe */}
                    <Row className="subscribe-container">
                        <FormControl
                            className='ft-subscribe-input'
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button className='subscribe-btn' variant="outline-light" onClick={handleSubscribe}>
                            Subscribe
                        </Button>
                    </Row>
                </Col>
                <Col lg={5} className='ft-col-3'>
                    <Row className='my-2'>CONTACT</Row>
                    <div className='mt-4'>support@educlubone.com</div>
                    <p className='my-2 ' style={{ color: "grey" }}>
                        Text Goes Here Text Goes Here Text Goes Here
                        Text Goes Here Text Goes Here
                    </p>
                </Col>
            </Row>
            <hr style={{
                width: '90%',
                height: '2px',
                backgroundColor: 'white',
                border: 'none',
            }} />
            <Row className='ft-row-2'>
                <Col lg={6}>
                    <img className='ft-logo' src={logoDark} alt="logo"></img>
                </Col>
            </Row>
        </Navbar>
    );
}

export default BlogFooter;