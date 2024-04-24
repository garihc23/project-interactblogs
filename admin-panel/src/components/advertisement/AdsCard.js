//src/components/advertisement/AdvertisementCard.js
import React, { useState } from 'react';
import { Card, Container, Button, Modal, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/advertisement/AdvertisementCard.css'; // Add your custom styling
import { deleteAdvertisement } from '../../api/adsApi';
import AdvertisementForm from './AdsForm'; // Import the AdvertisementForm component

const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/uploads';

const AdsCard = ({ ad, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false); // Add state for the Edit modal

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // const handleShowEditModal = () => setShowEditModal(true); // Function to open the Edit modal
  // const handleCloseEditModal = () => setShowEditModal(false);

  const handleDelete = () => {
    onDelete(ad.advertisementId); // Pass the ad ID to the onDelete callback
    handleCloseDeleteModal();
  };

  const handleEditClick = () => {
    onEdit(ad);
  }

  return (
    <Container>
      <Card className="advertisement-card">
        <Link to={`/ads/${ad.advertisementId}`} className="ad-image-link">
          <Card.Img
            variant="top"
            src={`${UPLOAD_URL}/adsImages/${ad.adImage}`}
            alt={ad.title}
          />
        </Link>
        <Card.Body>
          <Card.Title className="ad-card-title">{ad.title}</Card.Title>
          <Card.Text>
            <span className="ad-card-date">
              <strong>Start Date:</strong> {new Date(ad.startDate).toLocaleDateString()}<br />
              <strong>End Date:</strong> {new Date(ad.endDate).toLocaleDateString()}<br />
            </span>
            <strong>Active:</strong> {ad.isActive ? 'Yes' : 'No'}
          </Card.Text>
          <Row>
            <Col lg={6}>
              <Button variant="info" className="mr-2 ad-card-edit-btn" onClick={handleEditClick}>
                Edit
              </Button>
            </Col>
            <Col lg={6}>
              <Button variant="danger" className="ad-card-delete-btn" onClick={handleShowDeleteModal}>
                Delete
              </Button>
            </Col>
            <Col lg={12}>
              <Button variant="info" className="mt-1 mr-2 ad-card-edit-btn" >
                Archive
              </Button>
            </Col>
          </Row>
        </Card.Body>

        {/* Edit Modal */}
        {/* <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Advertisement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AdvertisementForm adData={ad} onCloseModal={handleCloseEditModal} />
          </Modal.Body>
        </Modal> */}

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this advertisement?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Container>
  );
};

export default AdsCard;