import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import AdvertisementForm from '../../components/advertisement/AdsForm.js';
import AdsCard from '../../components/advertisement/AdsCard.js';
import { useLoading } from '../../contexts/LoadingContext.js';
import {
    getAllAdvertisements,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
} from '../../api/adsApi.js';
import '../../assets/css/pages/advertisement/AdsPage.css'

const PAGE_SIZE = 10;

const AdsPage = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('startDate'); // Default sorting by startDate
    const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order
    const [searchQuery, setSearchQuery] = useState('');


    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        fetchAds();
    }, [currentPage, sortBy, sortOrder, searchQuery]);

    const fetchAds = async () => {
        startLoading();
        try {
            // const response = await getAllAdvertisements(searchQuery);
            let response;
            console.log("SQUE",searchQuery)
            if (searchQuery) {
                // Fetch advertisements filtered by search query
                response = await getAllAdvertisements(searchQuery);
            } else {
                // Fetch all advertisements
                response = await getAllAdvertisements();
            }
            // response = await getAllAdvertisements({ q: searchQuery });

            // Sort advertisements based on the selected criteria and order
            const sortedAds = sortAdvertisements(response, sortBy, sortOrder);
            setAdvertisements(sortedAds);
        } catch (error) {
            console.error('Error fetching Ads:', error);
        } finally {
            stopLoading();
        }
    };
    

    const sortAdvertisements = (ads, sortBy, sortOrder) => {
        return ads.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return bValue > aValue ? 1 : -1;
            }
        });
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = async () => {
        try {
            // Fetch advertisements before closing the modal
            await fetchAds();
        } finally {
            // Close the modal
            setShowModal(false);
            setSelectedAd(null);
            setCurrentPage(1);
        }
    };

    const handleEdit = (ad) => {
        setSelectedAd(ad);
        handleShowModal();
        handleFormSubmit();
        fetchAds();
    };

    const handleDelete = async (advertisementId) => {
        try {
            // console.log("DELADID", advertisementId);
            const token = localStorage.getItem('token');
            const response = await deleteAdvertisement(advertisementId, token);
            console.log('Delete Advertisement API Response:', response);
            fetchAds();
        } catch (error) {
            console.error('Error deleting advertisement:', error);
        }
    };

    const handleFormSuccess = () => {
        setShowModal(false);
        fetchAds();
    };

    const handleFormSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            if (selectedAd) {
                const response = await updateAdvertisement(selectedAd.advertisementId, formData, token);
                console.log('Update Advertisement API Response:', response);
            } else {
                const response = await createAdvertisement(formData, token);
                console.log('Create Advertisement API Response:', response);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSortChange = (newSortBy) => {
        // Toggle sorting order if the same criteria is selected
        setSortOrder((prevOrder) => (sortBy === newSortBy ? (prevOrder === 'asc' ? 'desc' : 'asc') : 'desc'));
        setSortBy(newSortBy);
    };

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const displayedAds = advertisements.slice(startIndex, endIndex);

    return (
        <Container className="ads-page-container">
            <h1>Advertisement</h1>
            {/* Sorting Buttons */}
            <div className="sorting-options">
                <Button
                    variant={sortBy === 'startDate' ? 'primary' : 'secondary'}
                    onClick={() => handleSortChange('startDate')}
                >
                    Start Date {sortBy === 'startDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
                <Button
                    variant={sortBy === 'createdAt' ? 'primary' : 'secondary'}
                    onClick={() => handleSortChange('createdAt')}
                >
                    Created At {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
                <Button
                    variant={sortBy === 'endDate' ? 'primary' : 'secondary'}
                    onClick={() => handleSortChange('endDate')}
                >
                    End Date {sortBy === 'endDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
            </div>

            <Button
                variant="primary"
                className="add-advertisement-btn"
                onClick={handleShowModal}
            >
                Add Advertisement
            </Button>
            {/* Search Bar */}
            <Form.Group controlId="searchBar" className="search-bar">
                <Form.Control
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </Form.Group>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">{selectedAd ? 'Edit' : 'Add'} Advertisement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AdvertisementForm adData={selectedAd} onSubmit={handleFormSubmit} />
                </Modal.Body>
            </Modal>


            <Row>
                {displayedAds && displayedAds.length > 0 ? (
                    displayedAds.map((ad) => (
                        <Col key={ad.id} xs={12} md={6} lg={4}>
                            <AdsCard ad={ad} onSubmit={handleFormSubmit} onDelete={handleDelete} onEdit={handleEdit} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No advertisements available.</p>
                    </Col>
                )}
            </Row>

            {/* Pagination Buttons */}
            <div className="pagination">
                <Button
                    variant="secondary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {'<'}
                </Button>
                {Array.from({ length: Math.ceil(advertisements.length / PAGE_SIZE) }).map(
                    (_, index) => (
                        <Button
                            key={index + 1}
                            variant={currentPage === index + 1 ? 'primary' : 'secondary'}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    )
                )}
                <Button
                    variant="secondary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(advertisements.length / PAGE_SIZE)}
                >
                    {'>'}
                </Button>
            </div>
        </Container>
    );
};

export default AdsPage;
