// EditAuthorModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateAuthorApi } from '../../api/authorApi';

const EditAuthorModal = ({ show, onClose, author }) => {
    const [editedAuthorName, setEditedAuthorName] = useState(author.name);
    const [editedAuthorEmail, setEditedAuthorEmail] = useState(author.email);
    const [editedAuthorDP, setEditedAuthorDP] = useState(author.authorDP || ''); // Assuming authorDP is an image URL

    const handleEditAuthor = async () => {
        try {
            const token = localStorage.getItem('token');
            // Call your API function to update the author
            await updateAuthorApi(author.authorId, {
                name: editedAuthorName,
                email: editedAuthorEmail,
                authorDP: editedAuthorDP, // Include the authorDP field
                // Add more details if needed
            }, token);

            // Close the modal and trigger any necessary actions
            onClose();
        } catch (error) {
            // Handle errors from the API call
            console.error('Error updating author:', error);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formEditedAuthorName">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter edited author name"
                            value={editedAuthorName}
                            onChange={(e) => setEditedAuthorName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEditedAuthorEmail">
                        <Form.Label>Author Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter edited author email"
                            value={editedAuthorEmail}
                            onChange={(e) => setEditedAuthorEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEditedAuthorDP">
                        <Form.Label>Author Display Picture (URL)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter edited author display picture URL"
                            value={editedAuthorDP}
                            onChange={(e) => setEditedAuthorDP(e.target.value)}
                        />
                    </Form.Group>
                    {/* Add more form fields for other author details */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditAuthor}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditAuthorModal;
