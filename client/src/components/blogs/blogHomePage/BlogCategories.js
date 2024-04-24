//client/src/components/blogs/blogHomePage/BlogCategories.js
import React from 'react'
import '../../../assets/css/blogs/BlogHomePage/BlogCategories.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dummyImg from '../../../assets/images/features-dummy.png';
import { useBlogStore } from '../../../stores/index';
import { Link } from 'react-router-dom';
import { useLoading } from '../../../contexts/LoadingContext';

const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || `http://localhost:5000/uploads`;

const BlogCategories = () => {

    const {
        blogPosts,
        fetchBlogPosts,
    } = useBlogStore();

    const { isLoading, startLoading, stopLoading } = useLoading(); // Access loading state and functions from LoadingContext

    useEffect(() => {
        startLoading(); // Start loading when component mounts
        fetchBlogPosts().then(() => {
            stopLoading(); // Stop loading once data is fetched
        }).catch((error) => {
            console.error('Error fetching blog posts:', error);
            stopLoading(); // Stop loading in case of an error
        });
    }, [fetchBlogPosts, startLoading, stopLoading]);

    const categories = ["Finance", "Sports", "Startup", "National", "Global", "Cyber"];
    const [selectedCategory, setSelectedCategory] = useState("Finance");
    // console.log("selected cat", selectedCategory)
    // const generatePosts = (category, count) =>
    //     Array.from({ length: count }, (_, index) => ({
    //         id: `${category}_${index + 1}`,
    //         category: `${category}`,
    //         title: `${category} Post ${index + 1}`,
    //         author: `${category} Author ${index + 1}`,
    //         date: "Nov 21,2023",
    //         time: "04:30 PM",
    //         content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${category} Post Content ${index + 1}`,
    //         image: `${dummyImg}`,/* `/images/${category}_${index + 1}.jpg`, */ // replace with the actual path to your images
    //     }));

    const goToCategory = (category) => {
        setSelectedCategory(category);
    };

    // const allPosts = categories.reduce((acc, category) => {
    //     const posts = generatePosts(category, 10);
    //     return [...acc, ...posts];
    // }, []);
    // console.log(allPosts)

    const itemsPerPage = 4;
    const totalItems = categories.length;
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    // Function to render HTML content safely
    const createMarkup = (htmlContent) => ({ __html: htmlContent });

    const handleBlogClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

    return (
        <div>
            <Container className='blog-cat-container'>
                <Row>
                    <h3 className='sec-heading'>Top Categories</h3>
                </Row>
                <Row className='blog-cat-slider'>
                    <Slider {...settings}>
                        {categories.map((category, index) => (
                            <div key={index}>
                                <Col>
                                    <div
                                        className={`blog-cat-tags ${selectedTag === category ? 'active' : ''}`}
                                        onClick={() => goToCategory(category)}
                                    >
                                        {category}
                                    </div>
                                </Col>
                            </div>
                        ))}
                    </Slider>
                </Row>
                <Row className='blog-cat-post-row'>
                    {blogPosts
                        .filter((post) => post.category === selectedCategory)
                        .slice(0, 6)
                        .map((post, index) => (
                            <Col lg={6} key={index} className='blog-cat-post-col'>
                                <Link to={`${post.title}/${post.postId}`} className='blog-cat-post-link' onClick={handleBlogClick}>
                                    <Row>
                                        <Col lg={4}>
                                            <img
                                                className='blog-cat-post-img'
                                                src={`${UPLOAD_URL}/blogPostImages/${post.headerImage}`}
                                                alt="postimg"
                                            />
                                        </Col>
                                        <Col lg={8}>
                                            <div className='blog-cat-post-title'>
                                                {post.title}
                                            </div>
                                            <div className='blog-cat-post-text' dangerouslySetInnerHTML={createMarkup(post.shortDescription.length > 45 ? `${post.shortDescription.slice(0, 45)}...` : post.shortDescription)}>
                                            </div>
                                            <div className='blog-cat-post-info'>
                                                {/* by {post.author} on */} {post.date}
                                            </div>
                                        </Col>

                                    </Row>
                                </Link>
                            </Col>
                        ))}
                    {/* Add empty columns if needed to maintain the grid structure */}
                    {Array.from({ length: Math.max(0, 2 - blogPosts.filter(post => post.category === selectedCategory).length) }).map((_, index) => (
                        <Col key={`empty-${index}`} className='blog-cat-post-col'></Col>
                    ))}
                </Row>

                <Row >
                    <a className='blog-cat-see-all' href='#'>See all...</a>
                </Row>
            </Container>
        </div>
    )


    // return (
    //     <div>
    //         <Container className='blog-cat-container'>
    //             <Row>
    //                 <h3 className='sec-heading'>Top Categories</h3>
    //             </Row>
    //             <Row className='blog-cat-slider'>
    //                 <Slider {...settings}>
    //                     {categories.map((item, index) => (
    //                         <div key={index}>
    //                             <Col>
    //                                 <div
    //                                     className={`blog-cat-tags ${selectedTag === item ? 'active' : ''}`}
    //                                     onClick={() => goToCategory(item)}
    //                                 >
    //                                     {item}
    //                                 </div>
    //                             </Col>
    //                         </div>
    //                     ))}
    //                 </Slider>
    //             </Row>
    //             <Row className='blog-cat-post-row'>
    //                 {allPosts
    //                     .filter(post => post.category === selectedCategory)
    //                     .slice(0, 2)
    //                     .map((post, index) => (
    //                         <Col key={index} className='blog-cat-post-col'>
    //                             <Row>
    //                                 <Col lg={4}>
    //                                     <img className='blog-cat-post-img' src={post.image} alt="postimg" />

    //                                 </Col>
    //                                 <Col lg={8}>
    //                                     <div className='blog-cat-post-title'>
    //                                         {post.title}
    //                                     </div>
    //                                     <div className='blog-cat-post-text'>
    //                                         {post.content.length > 45 ? `${post.content.slice(0, 45)}...` : post.content}
    //                                     </div>
    //                                     <Col className='blog-cat-post-info'>
    //                                         by {post.author} on {post.date}
    //                                     </Col>
    //                                 </Col>

    //                             </Row>
    //                         </Col>
    //                     ))}
    //                 {/* Add empty columns if needed to maintain the grid structure */}
    //                 {Array.from({ length: Math.max(0, 2 - allPosts.filter(post => post.category === selectedCategory).length) }).map((_, index) => (
    //                     <Col key={`empty-${index}`} className='blog-cat-post-col'></Col>
    //                 ))}
    //             </Row>
    //             <Row className='blog-cat-post-row'>
    //                 {allPosts
    //                     .filter(post => post.category === selectedCategory)
    //                     .slice(2, 4)
    //                     .map((post, index) => (
    //                         <Col key={index} className='blog-cat-post-col'>
    //                             <Row>
    //                                 <Col lg={4}>
    //                                     <img className='blog-cat-post-img' src={post.image} alt="postimg" />
    //                                 </Col>
    //                                 <Col lg={8}>
    //                                     <div className='blog-cat-post-title'>
    //                                         {post.title}
    //                                     </div>
    //                                     <div className='blog-cat-post-text'>
    //                                         {post.content.length > 45 ? `${post.content.slice(0, 45)}...` : post.content}
    //                                     </div>
    //                                     <Col className='blog-cat-post-info'>
    //                                         by {post.author} on {post.date}
    //                                     </Col>
    //                                 </Col>

    //                             </Row>
    //                         </Col>
    //                     ))}
    //                 {/* Add empty columns if needed to maintain the grid structure */}
    //                 {Array.from({ length: Math.max(0, 2 + 2 - allPosts.filter(post => post.category === selectedCategory).length) }).map((_, index) => (
    //                     <Col key={`empty-${index}`} className='blog-cat-post-col'></Col>
    //                 ))}
    //             </Row>
    //             <Row className='blog-cat-post-row'>
    //                 {allPosts
    //                     .filter(post => post.category === selectedCategory)
    //                     .slice(4, 6)
    //                     .map((post, index) => (
    //                         <Col key={index} className='blog-cat-post-col'>
    //                             <Row>
    //                                 <Col lg={4}>
    //                                     <img className='blog-cat-post-img' src={post.image} alt="postimg" />
    //                                 </Col>
    //                                 <Col lg={8}>
    //                                     <div className='blog-cat-post-title'>
    //                                         {post.title}
    //                                     </div>
    //                                     <div className='blog-cat-post-text'>
    //                                         {post.content.length > 45 ? `${post.content.slice(0, 45)}...` : post.content}
    //                                     </div>
    //                                     <Col className='blog-cat-post-info'>
    //                                         by {post.author} on {post.date}
    //                                     </Col>
    //                                 </Col>

    //                             </Row>
    //                         </Col>
    //                     ))}
    //                 {/* Add empty columns if needed to maintain the grid structure */}
    //                 {Array.from({ length: Math.max(0, 4 + 2 - allPosts.filter(post => post.category === selectedCategory).length) }).map((_, index) => (
    //                     <Col key={`empty-${index}`} className='blog-cat-post-col'></Col>
    //                 ))}
    //             </Row>
    //             <Row >
    //                 <a className='blog-cat-see-all' href='#'>See all...</a>
    //             </Row>
    //         </Container>
    //     </div>
    // )
}

export default BlogCategories