// AddAuthorModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {
  addAuthorApi,
} from '../../api/authorApi';

const MAX_IMAGE_SIZE = 300 * 1024; // 500 KB
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/uploads';

const AddAuthorModal = ({ show, onClose, onAuthorAdded }) => {

  const [authorData, setAuthorData] = useState({
    name: '',
    email: '',
    authorDP: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthorData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("AUTHORFILEE--", file);
    // Check file type
    if (file && /\.(png|jpeg|jpg)$/i.test(file.name)) {
      // Check file size
      if (file.size <= MAX_IMAGE_SIZE) {
        setAuthorData((prevData) => ({ ...prevData, authorDP: file }));
      } else {
        alert('Image size exceeds the allowed limit (500 KB).');
      }
    } else {
      alert('Invalid file format. Please choose a .png or .jpeg image.');
    }
  };
  const handleAddAuthor = async () => {
    try {
      // Get the authentication token
      const token = localStorage.getItem('token');
      console.log("AUTHOR_DATA_CHECK--",authorData);
      // Call your API function to add a new author
      const response = await addAuthorApi(authorData, token);

      // Check if the API call was successful
      if (response) {
        alert("Author Added Successfully");
        // Close the modal and trigger any necessary actions
        onClose();
        authorAddSuccess();
        onAuthorAdded();
        // authorName(''); authorEmail(''); authorDP('');
      } else {
        // Handle the case where the API call did not succeed
        console.error('Error adding author: Unexpected response');
      }
    } catch (error) {
      // Handle errors from the API call
      console.error('Error adding author:', error);
    }
  };

  const authorAddSuccess = () => {
    setAuthorData({
      name: '',
      email: '',
      authorDP: null,
    });
  }


  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form encType="multipart/form-data">
          <Form.Group controlId="formAuthorName" className='form-group'>
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter author name"
              value={authorData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAuthorEmail" className='form-group'>
            <Form.Label>Author Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter author email"
              value={authorData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAuthorDP" className='form-group'>
            <Form.Label className='label'>Author Display Picture  (only .png or .jpeg, max 300 KB) </Form.Label>
            <Form.Control
              name="authorDp"
              type="file"
              accept=".png, .jpeg, .jpg"
              onChange={handleFileChange}
            />
          </Form.Group>
          {/* Add more form fields for other author details */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddAuthor}>
          Add Author
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAuthorModal;
