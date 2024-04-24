import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BlogNavbar from '../../components/blogs/BlogNavbar';
import BlogTrending from '../../components/blogs/blogHomePage/BlogTrending';
import BlogLatestPosts from '../../components/blogs/blogHomePage/BlogLatestPosts';
import BlogCategories from '../../components/blogs/blogHomePage/BlogCategories';
import BlogSidebar from '../../components/blogs/BlogSidebar';
import BlogFooter from '../../components/blogs/BlogFooter';
import { useBlogStore } from '../../stores/index';
import { useLoading } from '../../contexts/LoadingContext';

const BlogHomePage = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  // const [isLoading, setIsLoading] = useState(true); // State to track loading
  // const { fetchTrendingPosts, fetchBlogPosts } = useBlogStore();
  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             setIsLoading(true); // Set loading to true before fetching data

  //             // Fetch trending posts and blog posts
  //             await Promise.all([fetchTrendingPosts(), fetchBlogPosts()]);

  //             setIsLoading(false); // Set loading to false after data is fetched
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //             setIsLoading(false); // Set loading to false in case of an error
  //         }
  //     };

  //     fetchData();

  //     // Cleanup function
  //     return () => setIsLoading(false); // Set loading to false if component unmounts before data is fetched
  // }, [fetchTrendingPosts, fetchBlogPosts]);

  return (
    <div>
      <BlogNavbar />
      <BlogTrending startLoading={startLoading} stopLoading={stopLoading} />
      <Container>
        <Row>
          <Col lg={9}>
            <BlogCategories startLoading={startLoading} stopLoading={stopLoading} /> {/* Pass startLoading and stopLoading functions as props */}
            <BlogLatestPosts startLoading={startLoading} stopLoading={stopLoading} /> {/* Pass startLoading and stopLoading functions as props */}
          </Col>
          <Col lg={3}>
            <BlogSidebar />
          </Col>
        </Row>
      </Container>
      <BlogFooter />
    </div>
  );
};

export default BlogHomePage;