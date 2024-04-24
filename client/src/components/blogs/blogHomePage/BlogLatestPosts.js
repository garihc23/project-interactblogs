//client/src/components/blogs/blogHomePage/BlogLatestPosts.js
import React, { useState, useEffect } from 'react'
import '../../../assets/css/blogs/BlogHomePage/BlogLatestPosts.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dummyImg from '../../../assets/images/features-dummy.png';
import { useBlogStore } from '../../../stores/index';
import { Link } from 'react-router-dom';
import { useLoading } from '../../../contexts/LoadingContext';

const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || `http://localhost:5000/uploads`;

const BlogLatestPosts = () => {
    const {
        latestPosts,
        fetchLatestPosts
    } = useBlogStore();

    const { isLoading, startLoading, stopLoading } = useLoading(); // Access loading state and functions from LoadingContext

    useEffect(() => {
        startLoading(); // Start loading when component mounts
        fetchLatestPosts().then(() => {
            stopLoading(); // Stop loading once data is fetched
        }).catch((error) => {
            console.error('Error fetching blog posts:', error);
            stopLoading(); // Stop loading in case of an error
        });
    }, [fetchLatestPosts, startLoading, stopLoading]);

    const itemsPerPage = 3;
    const totalItems = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    // const sampleData = [
    //     {
    //         id: 1,
    //         title: "The Art of dirWeb Development",
    //         category: "Web Development",
    //         author: "John Doe",
    //         date: "2023-11-09",
    //         time: "04:30 PM",
    //         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
    //     },
    //     {
    //         id: 2,
    //         title: "Exploring Machine Learning Algorithms",
    //         category: "Machine Learning",
    //         author: "Jane Smith",
    //         date: "2023-11-08",
    //         time: "04:30 PM",
    //         content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    //     },
    //     {
    //         id: 3,
    //         title: "Cooking Adventures: A Culinary Journey",
    //         category: "Food",
    //         author: "Alice Johnson",
    //         date: "2023-11-07",
    //         time: "04:30 PM",
    //         content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
    //     },
    //     {
    //         id: 4,
    //         title: "The Future of Artificial Intelligence",
    //         category: "Technology",
    //         author: "Bob Williams",
    //         date: "2023-11-06",
    //         time: "04:30 PM",
    //         content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui...",
    //     },
    //     {
    //         id: 5,
    //         title: "Travel Diaries: Exploring New Horizons",
    //         category: "Travel",
    //         author: "Emma Davis",
    //         date: "2023-11-05",
    //         time: "04:30 PM",
    //         content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
    //     },
    //     {
    //         id: 6,
    //         title: "Fitness Tips for a Healthy Lifestyle",
    //         category: "Health",
    //         author: "James Brown",
    //         date: "2023-11-04",
    //         time: "04:30 PM",
    //         content: "Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure...",
    //     },
    //     {
    //         id: 7,
    //         title: "The Impact of Social Media on Society",
    //         category: "Social Media",
    //         author: "Sophie White",
    //         date: "2023-11-03",
    //         time: "04:30 PM",
    //         content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui...",
    //     },
    //     {
    //         id: 8,
    //         title: "Career Insights: Navigating the Job Market",
    //         category: "Career",
    //         author: "Michael Harris",
    //         date: "2023-11-02",
    //         time: "04:30 PM",
    //         content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui...",
    //     },
    //     {
    //         id: 9,
    //         title: "Photography Tips for Beginners",
    //         category: "Photography",
    //         author: "Ava Robinson",
    //         date: "2023-11-01",
    //         time: "04:30 PM",
    //         content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
    //     },
    //     {
    //         id: 10,
    //         title: "Unlocking Creativity: Artistic Expression",
    //         category: "Art",
    //         author: "Oliver Miller",
    //         date: "2023-10-31",
    //         time: "04:30 PM",
    //         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
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


    //Tag or Feature selection
    /* const goToFeature = (tag) => {
        setSelectedTag(tag);
    }; */
    return (
        <div>
            <Container className='blog-latest-container'>
                <Row>
                    <h3 className='sec-heading'>Latest Posts</h3>
                </Row>
                <Row className='blog-latest-card-container'>
                    <Slider {...settings}>
                        {latestPosts.reverse().map((post, index) => (
                            <div key={index} >
                                <Col >
                                    <Link to={`${post.title}/${post.postId}`} className='blog-latest-post-link' onClick={handleBlogClick}>
                                        <div className='latest-card-overlay'></div>
                                        <div className='latest-card-col ' style={{ margin: '0 30px 0 0' }}>
                                            <div className='latest-img-container'>
                                                <img
                                                    className='latest-card-img'
                                                    src={`${UPLOAD_URL}/blogPostImages/${post.headerImage}`}
                                                    alt="CardImg"
                                                />
                                                <div className='latest-card-text-container'>
                                                    <h4 className='latest-card-title'>{post.title}</h4>
                                                    <div className='latest-card-text'>
                                                        {post.category} | {post.date}
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

export default BlogLatestPosts;