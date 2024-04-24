// src/components/blog/ManageAuthors.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import {
    getAllAuthorsApi,
    deleteAuthorApi,
} from '../../api/authorApi';
import AddAuthorModal from '../../components/blog/AddAuthorModal';
import EditAuthorModal from './EditAuthorModal'; // Create an EditAuthorModal component

const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/uploads';

const ManageAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [showAddAuthorModal, setShowAddAuthorModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [authorToDelete, setAuthorToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [authorToEdit, setAuthorToEdit] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const authorsPerPage = 10;

    useEffect(() => {
        fetchAuthors();
    }, [searchQuery, currentPage]);

    const fetchAuthors = async () => {
        try {
            const data = await getAllAuthorsApi(searchQuery);
            const startIndex = (currentPage - 1) * authorsPerPage;
            const endIndex = startIndex + authorsPerPage;
            setAuthors(data.slice(startIndex, endIndex));
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset to the first page when performing a new search
        fetchAuthors();
    };

    //author adding
    const handleShowAddAuthorModal = () => {
        setShowAddAuthorModal(true);
    };

    const handleCloseAddAuthorModal = () => {
        setShowAddAuthorModal(false);
    };

    const handleAuthorAdded = () => {
        // Handle any actions needed after adding an author (e.g., refetch authors)
        fetchAuthors();
        handleCloseAddAuthorModal();
    };

    //Deletion
    const handleShowDeleteModal = (author) => {
        setAuthorToDelete(author);
        setShowDeleteModal(true);
    };

    const handleHideDeleteModal = () => {
        setAuthorToDelete(null);
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            if (authorToDelete) {
                const token = localStorage.getItem('token');
                await deleteAuthorApi(authorToDelete.authorId, token);
                fetchAuthors(); // Refresh the authors list after deletion
            }
            handleHideDeleteModal();
        } catch (error) {
            console.error('Error deleting author:', error);
        }
    };

    //Editing or Updation
    const handleShowEditModal = (author) => {
        setAuthorToEdit(author);
        setShowEditModal(true);
    };

    const handleHideEditModal = () => {
        setAuthorToEdit(null);
        setShowEditModal(false);
        fetchAuthors(); // Refresh the authors list after editing
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <Row>
                <Col lg={2}>
                    <Button
                        className='blog-btn'
                        variant="primary"
                        onClick={handleShowAddAuthorModal}
                    >
                        Add Author
                    </Button>
                </Col>
            </Row>
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search by Author Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline-secondary" onClick={handleSearch}>
                        Search
                    </Button>
                </InputGroup>
            </Row>

            {/* Add Author Modal */}
            <AddAuthorModal
                show={showAddAuthorModal}
                onClose={handleCloseAddAuthorModal}
                onAuthorAdded={handleAuthorAdded}
            />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Author Name</th>
                        <th>Author ID</th>
                        <th>Email</th>
                        <th>Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author, index) => (
                        <tr key={author.authorId}>
                            <td>{((currentPage-1) * 10) + index + 1}</td>
                            <td>{author.name}</td>
                            <td>{author.authorId}</td>
                            <td>{author.email}</td>
                            <td>
                                <img
                                    src={author.authorDP?`${UPLOAD_URL}/authorImages/${author.authorDP}`:`${UPLOAD_URL}/authorImages/default-profile.png`}
                                    alt={`Author ${author.name}`}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleShowDeleteModal(author)}>
                                    Delete
                                </Button>{' '}
                                <Button variant="primary" onClick={() => handleShowEditModal(author)}>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Row>
                <Col>
                    <div className="d-flex justify-content-center">
                        <Button
                            variant="outline-secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="mx-2">{currentPage}</span>
                        <Button
                            variant="outline-secondary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={authors.length < authorsPerPage}
                        >
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>

            {/* Modal for confirming author deletion */}
            <Modal show={showDeleteModal} onHide={handleHideDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the author with ID: "{authorToDelete?.authorId}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for editing author details */}
            {authorToEdit && (
                <EditAuthorModal
                    show={showEditModal}
                    onClose={handleHideEditModal}
                    author={authorToEdit}
                />
            )}
        </div>
    );
};

export default ManageAuthors;
