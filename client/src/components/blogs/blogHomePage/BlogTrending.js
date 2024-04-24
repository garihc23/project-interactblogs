import React, { useState, useEffect } from 'react'
import '../../../assets/css/blogs/BlogHomePage/BlogTrending.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dummyImg from '../../../assets/images/features-dummy.png'
import { useBlogStore } from '../../../stores/index';
import { Link } from 'react-router-dom';
import { useLoading } from '../../../contexts/LoadingContext';


const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || `http://localhost:5000/uploads`;

const BlogTrending = () => {
    const {
        trendingPosts,
        fetchTrendingPosts,
    } = useBlogStore();

    const { isLoading, startLoading, stopLoading } = useLoading(); // Access loading state and functions from LoadingContext

    useEffect(() => {
        startLoading(); // Start loading when component mounts
        fetchTrendingPosts().then(() => {
            stopLoading(); // Stop loading once data is fetched
        }).catch((error) => {
            console.error('Error fetching blog posts:', error);
            stopLoading(); // Stop loading in case of an error
        });
    }, [fetchTrendingPosts, startLoading, stopLoading]);

    const itemsPerPage = 4;
    const totalItems = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    // const sampleData = [
    //     {
    //         id: 1,
    //         title: "Exploring React Hooks",
    //         category: "Programming",
    //         time: "10:00 AM",
    //     },
    //     {
    //         id: 2,
    //         title: "Traveling on a Budget",
    //         category: "Travel",
    //         time: "11:30 AM",
    //     },
    //     {
    //         id: 3,
    //         title: "Healthy Recipes for Busy Lives",
    //         category: "Food",
    //         time: "01:15 PM",
    //     },
    //     {
    //         id: 4,
    //         title: "Mastering Time Management",
    //         category: "Productivity",
    //         time: "03:00 PM",
    //     },
    //     {
    //         id: 5,
    //         title: "Artificial Intelligence in Everyday Life",
    //         category: "Technology",
    //         time: "05:45 PM",
    //     },
    //     {
    //         id: 6,
    //         title: "Effective Communication Skills",
    //         category: "Self-Improvement",
    //         time: "07:30 PM",
    //     },
    //     {
    //         id: 7,
    //         title: "Photography Tips for Beginners",
    //         category: "Photography",
    //         time: "09:15 PM",
    //     },
    //     {
    //         id: 8,
    //         title: "Exploring Virtual Reality",
    //         category: "Technology",
    //         time: "11:00 PM",
    //     },
    //     {
    //         id: 9,
    //         title: "Tips for Successful Blogging",
    //         category: "Blogging",
    //         time: "02:45 PM",
    //     },
    //     {
    //         id: 10,
    //         title: "Financial Planning for Beginners",
    //         category: "Finance",
    //         time: "04:30 PM",
    //     },

    // ];

    //Pagination
    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage === totalPages ? 1 : prevPage + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage(prevPage => prevPage === 1 ? totalPages : prevPage - 1);
    };

    // Slider settings
    const settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: itemsPerPage,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const handleBlogClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };
    console.log("TRENDINF POST",trendingPosts);

    //Tag or Feature selection
    /* const goToFeature = (tag) => {
        setSelectedTag(tag);
    }; */
    return (
        <div>
            <Container className='blog-trend-container'>
                <Row>
                    <h3 className='sec-heading'>Trendings</h3>
                </Row>
                <Row className='blog-trend-card-container'>
                    <Slider {...settings} unslick={true}>
                        {trendingPosts.map((post, index) => (
                            <div key={index} >
                                <Col >
                                    <Link to={`${post.title}/${post.postId}`} className='blog-trend-post-link' onClick={handleBlogClick}>
                                        <div className='trend-card-overlay'></div>
                                        <div className='trend-card-col ' style={{ margin: '0 30px 0 0' }}>
                                            <div className='trend-img-container'>
                                                <img
                                                    className='trend-card-img'
                                                    src={`${UPLOAD_URL}/blogPostImages/${post.headerImage}`}
                                                    alt="CardImg"
                                                />
                                                <div className='trend-card-text-container'>
                                                    <h4 className='trend-card-title'>{post.title}</h4>
                                                    <div className='trend-card-text'>
                                                        {post.category} | {post.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            </div>
                        ))}
                    </Slider>
                </Row>
                <Row >
                    <a className='blog-see-all' href='#'>More...</a>
                </Row>
            </Container>
        </div>
    );
}

export default BlogTrending;