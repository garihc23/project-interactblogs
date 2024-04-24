//pages/Blogs.js
import React, { useState, useEffect, useMemo } from 'react';
import { Card, Button, Form, FormControl, Modal, Container, Row, Col } from 'react-bootstrap';
import {
    getAllBlogPosts,
    updateBlogPost as updateBlogPostApi,
    deleteBlogPost as deleteBlogPostApi,
} from '../../api/blogApi';
import '../../assets/css/pages/blog/Blogs.css';
import BlogEditor from '../../components/blog/BlogEditor';
import BlogDetail from './BlogDetail';
import Pagination from '../../components/common/Pagination';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import ManageAuthors from '../../components/blog/ManageAuthor';
import { useLoading } from '../../contexts/LoadingContext.js';

let PageSize = 12;

const Blogs = () => {
    const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/uploads';
    console.log("UPP---", UPLOAD_URL);

    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [showManageAuthors, setShowManageAuthors] = useState(false);

    const [showBlogEditor, setShowBlogEditor] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by createdAt
    const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order

    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        fetchBlogs(); // Call the fetchBlogs function when the component mounts
    }, [sortBy, sortOrder]);

    const fetchBlogs = async () => {
        startLoading();
        try {
            const response = await getAllBlogPosts(); // Use the API call to fetch blogs
            // Sort blogs based on the selected criteria and order
            const sortedBlogs = sortBlogs(response, sortBy, sortOrder);
            setBlogs(sortedBlogs); // Set the fetched and sorted blogs in the state
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            stopLoading();
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleManageAuthorClick = () => {
        if (showManageAuthors) {
            setShowManageAuthors(false);
        }
        else {
            setShowManageAuthors(true);
        }
    }

    //manage blog

    const handleAddBlog = () => {
        setShowBlogEditor(true);
    };

    const handleCloseBlog = () => {
        setShowBlogEditor(false);
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePublishSuccess = () => {
        // Perform any actions you need on successful publish
        setShowBlogEditor(false); // Close the BlogEditor component
        fetchBlogs(); // Fetch blogs again to update the list
    };

    const handleEditBlog = (blog) => {
        setSelectedBlog(blog);
    };

    useEffect(() => {
    }, [selectedBlog]);

    const updateBlogPost = async (postId, updatedData) => {
        try {
            // Use your API function to update the blog post
            await updateBlogPostApi(postId, updatedData);
        } catch (error) {
            console.error('Error updating blog post:', error);
            throw error; // Propagate the error back to the caller if needed
        }
    };

    const handleCloseUpdateModal = () => {
        fetchBlogs();
        setShowUpdateModal(false);
        setSelectedBlog(null);
    };

    const showDeleteConfirmation = (blog) => {
        setBlogToDelete(blog);
        setShowDeleteModal(true);
    };

    const hideDeleteConfirmation = () => {
        setBlogToDelete(null);
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = async () => {
        if (blogToDelete) {
            await handleDeleteBlog(blogToDelete.postId);
        }
        hideDeleteConfirmation();
    };

    const handleDeleteBlog = async (postId) => {
        try {
            // Get the authentication token
            const token = localStorage.getItem('token');
            // Call your delete API endpoint with the postId
            await deleteBlogPostApi(postId, token);

            // Fetch blogs again to update the list
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };
    //Sorting 
    const sortBlogs = (blogs, sortBy, sortOrder) => {
        return blogs.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (sortOrder === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
    };

    const handleSortChange = (newSortBy) => {
        // Toggle sorting order if the same criteria is selected
        setSortOrder((prevOrder) => (sortBy === newSortBy ? (prevOrder === 'asc' ? 'desc' : 'asc') : 'desc'));
        setSortBy(newSortBy);
    };

    //pagination
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredBlogs.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredBlogs]);

    return (
        <Container className="blog-container">
            {/* <Button onClick={handleBlogDetail}>
                BlogDetailPage
            </Button> */}
            <Row>
                <Col lg={7} className="page-title">Blogs Page</Col>
                <Col lg={2}>
                    {!showBlogEditor ? (
                        <Button
                            className='blog-btn'
                            variant="primary"
                            onClick={handleAddBlog}
                        >
                            Add Blog
                        </Button>
                    ) : (
                        <Button
                            className='blog-btn'
                            variant="primary danger"
                            onClick={handleCloseBlog}
                        >
                            Close Blog
                        </Button>
                    )}
                </Col>
                <Col lg={3}>
                    <Button
                        className='blog-btn'
                        variant="primary"
                        onClick={handleManageAuthorClick}
                    >
                        Manage Authors
                    </Button>
                </Col>

            </Row>
            <Row>
                {showManageAuthors &&
                    <>
                        <ManageAuthors
                        // onClose={() => setShowManageAuthors(false)}
                        />
                    </>
                }
            </Row>
            <Row>
                {/* Sorting Buttons */}
                <Col className="sorting-options">
                    <Button
                        variant={sortBy === 'createdAt' ? 'primary' : 'secondary'}
                        onClick={() => handleSortChange('createdAt')}
                    >
                        Created At {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </Button>
                    <Button
                        variant={sortBy === 'title' ? 'primary' : 'secondary'}
                        onClick={() => handleSortChange('title')}
                    >
                        Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </Button>
                </Col>

            </Row>
            <Row>
                <Form className="search-form">
                    <FormControl
                        type="text"
                        placeholder="Search by blog name"
                        className="mr-sm-2"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form>
            </Row>
            <Row>
                {showBlogEditor &&
                    <>
                        <BlogEditor onClose={() => setShowBlogEditor(false)} onPublishSuccess={handlePublishSuccess} />
                    </>
                }

            </Row>

            <Row className="blog-cards-container">
                {currentTableData.map((blog) => (
                    <Col lg={4}>
                        <Card key={blog.id} className="blog-card">
                            <Link to={`/blog/${blog.title}/${blog.postId}`}>
                                <Card.Img
                                    className='blog-card-img'
                                    variant="top"
                                    src={`${UPLOAD_URL}/blogPostImages/${blog.headerImage}`}
                                    alt={blog.headerImage} />
                            </Link>
                            <Card.Body>
                                <Card.Title className="blog-card-title">
                                    {`${blog.title.substring(0, 58)}${blog.title.length > 58 ? '...' : ''}`}
                                </Card.Title>
                                <Card.Text className="blog-card-text">
                                    <strong>Category:</strong> {blog.category}
                                </Card.Text>
                                <Card.Text className="blog-card-shortDes">
                                    {`${blog.shortDescription.substring(0, 70)}${blog.shortDescription.length > 70 ? '...' : ''}`}
                                </Card.Text>
                                <Row className='blog-card-btn-container'>
                                    <Col>
                                        <Button
                                            className='blog-btn blog-card-btn'
                                            variant="primary"
                                            onClick={() => {
                                                // console.log("--edit__1Blog", blog)
                                                handleEditBlog(blog);
                                                setShowUpdateModal(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            className='blog-btn blog-card-btn'
                                            variant="danger"
                                            onClick={() => { showDeleteConfirmation(blog); /* handleDeleteBlog(blog.postId); */ }}
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}
            </Row>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={filteredBlogs.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />

            {/* Modal to Delete Blog */}
            <Modal show={showDeleteModal} onHide={hideDeleteConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the blog post titled "{blogToDelete?.title}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideDeleteConfirmation}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleConfirmDelete(blogToDelete)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Blog Editor Modal */}
            <Modal
                className='blog-update-modal'
                show={showUpdateModal}
                onHide={handleCloseUpdateModal}
                size="lg"
            >
                <Row className='blog-update-modal-container'>
                    <Modal.Header className='blog-update-modal-header' closeButton>
                        <Modal.Title>Update Blog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='blog-update-modal-body'>
                        <BlogEditor
                            onClose={handleCloseUpdateModal}
                            onPublishSuccess={handlePublishSuccess}
                            selectedBlog={selectedBlog}
                        />
                    </Modal.Body>
                </Row>
            </Modal>

        </Container>
    );
};

export default Blogs;
