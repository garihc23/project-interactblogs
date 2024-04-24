// src/pages/NotFound.js

import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import '../assets/css/common/NotFound.css'; // Import the external CSS

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  }

  return (
    <div className="pg404-container">
      <h2 className="pg404-heading">404 - Not Found</h2>
      <p className="pg404-text">The requested page does not exist.</p>
      <Button className="pg404-button" onClick={handleBackToHome}> Back To Home</Button>
    </div>
  );
};

export default NotFound;
