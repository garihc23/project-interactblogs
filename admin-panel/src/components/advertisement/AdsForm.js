// src/components/advertisement/AdvertisementForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../../assets/css/advertisement/AdvertisementForm.css';
import {
  createAdvertisement,
  updateAdvertisement
} from '../../api/adsApi'

const MAX_IMAGE_SIZE = 500 * 1024; // 500 KB
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/uploads';

const AdvertisementForm = ({ adData, onSubmit, onCloseModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    adImage: null,
    targetUrl: '',
    startDate: '',
    endDate: '',
    width: null,
    height: null,
    isActive: true,
    adType:'',
    views: '',
    clicks: '',

  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Use useEffect to update the form data when adData changes
  useEffect(() => {
    if (adData) {
      setFormData((prevData) => ({
        ...prevData,
        ...adData,
        startDate: adData.startDate ? formatDate(adData.startDate) : '', // Format date if it exists
        endDate: adData.endDate ? formatDate(adData.endDate) : '', // Format date if it exists
      }));
    }
  }, [adData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("AD_FILEE--", file);
    // Check file type
    if (file && /\.(png|jpeg|jpg)$/i.test(file.name)) {
      // Check file size
      if (file.size <= MAX_IMAGE_SIZE) {
        setFormData((prevData) => ({ ...prevData, adImage: file }));
      } else {
        alert('Image size exceeds the allowed limit (500 KB).');
      }
    } else {
      alert('Invalid file format. Please choose a .png or .jpeg image.');
    }
  };

  const handleSubmit = async () => {
    onSubmit(formData);
  };


  return (
    <Container className='ads-form-container'>
      <Form
        encType="multipart/form-data"
        className="ads-form">
        <Form.Group controlId="title" className="form-group">
          <Form.Label className="label">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description" className="form-group">
          <Form.Label className="label">Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="adImage" className="form-group">
          <Form.Label className="label">Ad Image (only .png or .jpeg or .gif, max 500 KB)</Form.Label>
          <Form.Control
            name="adImage"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            // placeholder="Enter ad image"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group controlId="targetUrl" className="form-group">
          <Form.Label className="label">Target URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter target URL"
            name="targetUrl"
            value={formData.targetUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col lg={4}>
            <Form.Group controlId="startDate" className="form-group">
              <Form.Label className="label">Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group controlId="endDate" className="form-group">
              <Form.Label className="label">End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={4}>
            <Form.Group controlId="width" className="form-group">
              <Form.Label className="label">Width</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter width"
                name="width"
                value={formData.width}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group controlId="height" className="form-group">
              <Form.Label className="label">Height</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter height"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Form.Group controlId="isActive">
            <Form.Label>Is Active?</Form.Label>
            <div>
              <Form.Check
                type="switch"
                id="isActiveSwitch"
                label=""
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, isActive: e.target.checked }))}
              />
            </div>
          </Form.Group>
        </Row>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
       
      </Form>
    </Container>
  );
};

export default AdvertisementForm;