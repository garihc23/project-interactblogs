import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getAdvertisementById } from '../../api/adsApi';
import { useLoading } from '../../contexts/LoadingContext.js';
import '../../assets/css/pages/advertisement/AdsDetail.css'

const AdsDetail = () => {
    const { advertisementId } = useParams(); // Get the advertisement ID from route parameters
    const [advertisement, setAdvertisement] = useState(null);
    const navigate = useNavigate();

    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        startLoading();
        // Fetch advertisement details based on the advertisement ID
        const fetchAdvertisementDetails = async () => {
            try {
                const response = await getAdvertisementById(advertisementId);
                setAdvertisement(response);
                // console.log("adRespoID",response.data) // Assuming the response contains advertisement data
            } catch (error) {
                console.error('Error fetching advertisement details:', error);
            } finally {
                stopLoading();
            }
        };

        fetchAdvertisementDetails();
    }, [advertisementId]);

    const handleBackClick = () => {
        navigate('/ads')
    }

    return (
        <Container className="ads-detail-container">
            <Row>
                <Col>
                    {advertisement && (
                        <>
                            <h3 className="ads-detail-title">Title: {advertisement.title}</h3>
                            <p className="ads-detail-description">Description: {advertisement.description}</p>
                            <Row>
                                <Col lg={4}>
                                    <p className="ads-detail-date">Start Date: {new Date(advertisement.startDate).toLocaleDateString()}</p>
                                </Col>
                                <Col lg={4}>
                                    <p className="ads-detail-date">End Date: {new Date(advertisement.endDate).toLocaleDateString()}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <p className="ads-detail-date">Created At: {new Date(advertisement.createdAt).toLocaleDateString()}</p>
                                </Col>
                                <Col lg={4}>
                                    <p className="ads-detail-date">Updated At: {new Date(advertisement.updatedAt).toLocaleDateString()}</p>
                                </Col>
                            </Row>
                            <p className="ads-detail-active">Active: {advertisement.isActive ? 'Yes' : 'No'}</p>
                            {/* Add more details as needed */}
                            <img
                                src={`http://localhost:5000/uploads/adsImages/${advertisement.adImage}`}
                                alt={advertisement.title}
                                className="ads-detail-image"
                                style={{ height: `${advertisement.height}px`, width: `${advertisement.width}px`, objectFit: 'contain', border: '5px solid yellow' }}
                            />
                        </>
                    )}
                </Col>
            </Row>
            <Button className='ads-detail-back-btn' onClick={handleBackClick}>
                Back to Ads
            </Button>
        </Container>
    );
};

export default AdsDetail;
