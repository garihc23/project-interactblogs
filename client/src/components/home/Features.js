import React, { useState } from 'react';
import '../../assets/css/pages/home/Features.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import dummyImg from '../../assets/images/features-dummy.png'

const Features = () => {
    const items = [
        "College Search",
        "Competitions",
        "Jobs & Internships",
        "Notes",
        "Bare Acts",
        "Skill Club",
        "Maxims",
        "Case Locks",
        "Mentorship",
        "Research Assistant",
    ];

    const descriptions = {
        "College Search": "Choose the best out there. Search for your future with the college search for free.",
        "Competitions": "Find and participate in competitions to challenge yourself and earn rewards.",
        "Jobs & Internships": "Browse and apply for jobs and internships that match your skills and interests.",
        "Notes": "Create and share notes with other students to collaborate and learn together.",
        "Bare Acts": "Access and study the latest bare acts in a convenient and easy-to-use format.",
        "Skill Club": "Join and learn from the best in your field with Skill Club.",
        "Maxims": "Read and learn from wise maxims to inspire your journey.",
        "Case Locks": "Solve and learn from challenging case locks to sharpen your skills.",
        "Mentorship": "Get mentorship from experienced professionals to guide you on your journey.",
        "Research Assistant": "Text goes here text goes here text goes here text goes here.",
    };


    const itemsPerPage = 7;
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState("College Search");

    //Pagination
    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage === totalPages ? 1 : prevPage + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage(prevPage => prevPage === 1 ? totalPages : prevPage - 1);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: itemsPerPage,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };

    //Tag or Feature selection
    const goToFeature = (tag) => {
        setSelectedTag(tag);
    };

    return (
        <Container className="features-container">
            <Row>
                <h2 className="features-heading">Everything at one place for you</h2>
            </Row>
            <Row className="feature-tags-container">
                <Slider {...settings}>
                    {items.map((item, index) => (
                        <div key={index}>
                            <Col>
                                <div
                                    className={`feature-tags ${selectedTag === item ? 'active' : ''}`}
                                    onClick={() => goToFeature(item)}
                                >
                                    {item}
                                </div>
                            </Col>
                        </div>
                    ))}
                </Slider>
            </Row>

            {/* Conditionally render the expanded container */}
            {selectedTag && (
                <Row className={`features-expanded-container ${selectedTag}`}>
                    <Col lg={4}>
                        <h5 className="features-title">
                            {selectedTag}
                        </h5>
                        <p className="features-description">
                            {descriptions[selectedTag]}
                        </p>
                        <a className="features-link" href="#/clg-srch">
                            Learn more
                        </a>
                    </Col>
                    <Col lg={8}>
                        <img className="features-img" src={dummyImg} alt="Features Image" />
                    </Col>
                </Row>
            )}
            
            {/* 
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        College Search
                    </h5>
                    <p className='features-description'>
                        Choose the best out there. Search for your future with the college search for free.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Competitions
                    </h5>
                    <p className='features-description'>
                        Find and participate in competitions to challenge yourself and earn rewards.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Jobs & Internships
                    </h5>
                    <p className='features-description'>
                        Browse and apply for jobs and internships that match your skills and interests.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Notes
                    </h5>
                    <p className='features-description'>
                        Create and share notes with other students to collaborate and learn together.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Bare Acts
                    </h5>
                    <p className='features-description'>
                        Access and study the latest bare acts in a convenient and easy-to-use format.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Skill Club
                    </h5>
                    <p className='features-description'>
                        Join and learn from the best in your field with Skill Club.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Maxims
                    </h5>
                    <p className='features-description'>
                        Read and learn from wise maxims to inspire your journey.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Case Locks
                    </h5>
                    <p className='features-description'>
                        Solve and learn from challenging case locks to sharpen your skills.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Mentorship
                    </h5>
                    <p className='features-description'>
                        Get mentorship from experienced professionals to guide you on your journey.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row>
            <Row className='features-expanded-container'>
                <Col lg={4}>
                    <h5 className='features-title'>
                        Research Assistant
                    </h5>
                    <p className='features-description'>
                        Text goes here text goes here text goes here text goes here.
                    </p>
                    <a className='features-link' href='#/clg-srch'>
                        Learn more
                    </a>
                </Col>
                <Col lg={8}>
                    <img className='features-img' src={dummyImg} alt="Features Image" />
                </Col>
            </Row> */}

        </Container>
    );
};

export default Features;

