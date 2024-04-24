// BlogDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '../../api/blogApi';
import '../../assets/css/pages/blog/BlogDetail.css';
import { useLoading } from '../../contexts/LoadingContext.js';
import { Container, Row } from 'react-bootstrap';

const BlogDetail = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;
  console.log("UPLOADURL--", UPLOAD_URL);

  const { startLoading, stopLoading } = useLoading();

  // useEffect(() => {
  //   fetchBlogPost();
  // }, [postId]);

  const fetchBlogPost = async () => {
    startLoading();
    try {
      const response = await getBlogPostById(postId);
      console.log('Blog Detail:', response);
      setBlog(response);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    } finally {
      stopLoading();
    }
  };

  const fetchImageAndCreateUrl = async () => {
    try {
      const response = await fetch(`${UPLOAD_URL}/blogPostImages/${blog.headerImage}`, {
        credentials: 'include', // Include cookies and other credentials
        mode: 'cors', // Enable CORS
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog post image');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setBlog({ ...blog, headerImageUrl: imageUrl });
    } catch (error) {
      console.error('Error fetching blog post image:', error);
    }
  };

  useEffect(() => {
    fetchBlogPost();
    fetchImageAndCreateUrl();
  }, [postId]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="blog-detail-container">
      {/* <img
        src={`${UPLOAD_URL}/blogPostImages/${blog.headerImage}`}
        alt={blog.headerImage}
        className="blog-detail-image"
      /> */}
      <img
        src={blog.headerImageUrl}
        alt={blog.headerImage}
        className="blog-detail-image"
      />
      <Row>
        <h2 className="blog-detail-title">{blog.title}</h2>
        <div className="blog-detail-meta">
          <span className="blog-detail-category">{blog.category}</span>
          <span className="blog-detail-date">{blog.date}</span>
          {/* Add more details like author, views, etc., if available */}
        </div>
      </Row>
      <Row className='blog-detail-shortDesc'>
        {blog.shortDescription}
      </Row>

      <Row
        className="blog-detail-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </Container>
  );
};

export default BlogDetail;
