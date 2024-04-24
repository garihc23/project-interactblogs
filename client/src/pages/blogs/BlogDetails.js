//client/src/pages/blogs/BlogDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/blogs/BlogDetails/BlogDetails.css';
import BlogNavbar from '../../components/blogs/BlogNavbar';
import { Col, Container, Row, Image } from 'react-bootstrap';
import dummyImg from '../../assets/images/header-banner.png';
import BlogSidebar from '../../components/blogs/BlogSidebar';
import BlogFooter from '../../components/blogs/BlogFooter';
import { useBlogStore } from '../../stores/index';
import { useEffect } from 'react';
import { useLoading } from '../../contexts/LoadingContext';

const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || `http://localhost:5000/uploads`;

const BlogDetails = () => {
  const { postId } = useParams();
  const { blogPostById, fetchBlogPostById } = useBlogStore();

  const { isLoading, startLoading, stopLoading } = useLoading(); // Access loading state and functions from LoadingContext

  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Start loading when component mounts
      try {
        await fetchBlogPostById(postId); // Pass postId to fetchBlogPostById
        stopLoading(); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching blog post:', error);
        stopLoading(); // Stop loading in case of an error
      }
    };
    fetchData();
  }, [fetchBlogPostById, postId, startLoading, stopLoading]);

  // useEffect(() => {
  //   fetchBlogPostById(postId);
  // }, [postId, fetchBlogPostById]);

  // Function to render HTML content safely
  const createMarkup = (htmlContent) => ({ __html: htmlContent });

  // if (!blogPostById) {
  //   return <div>Loading...</div>; // Placeholder while data is being fetched
  // }

  return (
    <div>
      <BlogNavbar />
      <Container>
        <Row className='blog-details'>
          <Col lg={9}>
            <img className='blog-title-img' src={`${UPLOAD_URL}/blogPostImages/${blogPostById.headerImage}`} alt="Banner-Image" />
            <Row className='blog-content'>
              <h2 className='blog-title'>{blogPostById.title}</h2>
              <p className='blog-desc' dangerouslySetInnerHTML={createMarkup(blogPostById.shortDescription)} />
              {/* <h4 className='blog-heading'>The Need for Slow Living</h4> */}
              <div className='blog-content' dangerouslySetInnerHTML={createMarkup(blogPostById.content)} />
            </Row>
            <Row>

            </Row>
          </Col>
          <Col lg={3}>
            <BlogSidebar></BlogSidebar>
          </Col>
        </Row>
      </Container>
      <BlogFooter />
      {/* Add other content here */}
    </div>
  );

  // return (
  //   <div>
  //     <BlogNavbar />
  //     <Container>
  //       <Row className='blog-details'>
  //         <Col lg={9}>
  //           <img className='blog-title-img' src={dummyImg} alt="Banner-Image" />
  //           <Row className='blog-content'>
  //             <h2 className='blog-title'>Embracing the Art of Slow Living: A Journey to Mindful Living</h2>
  //             <p className='blog-desc'>
  //               In our fast-paced, technology-driven world, the idea of slowing down may seem counterintuitive.
  //               The constant hustle and bustle can leave us feeling drained, stressed, and disconnected from the present moment.
  //               However, there is a growing movement that encourages us to embrace the art of slow living, to savor life's moments and find joy in the simple pleasures.
  //               Join me on a journey to explore the beauty of mindful living.
  //             </p>
  //             <h4 className='blog-heading'>The Need for Slow Living</h4>
  //             <p className='blog-desc'>
  //               In our fast-paced, technology-driven world, the idea of slowing down may seem counterintuitive.
  //               The constant hustle and bustle can leave us feeling drained, stressed, and disconnected from the present moment.
  //               However, there is a growing movement that encourages us to embrace the art of slow living, to savor life's moments and find joy in the simple pleasures.
  //               Join me on a journey to explore the beauty of mindful living.
  //             </p>
  //           </Row>
  //           <Row>

  //           </Row>
  //         </Col>
  //         <Col lg={3}>
  //           <BlogSidebar></BlogSidebar>
  //         </Col>
  //       </Row>
  //     </Container>
  //     <BlogFooter />
  //     {/* Add other content here */}
  //   </div>
  // );
}

export default BlogDetails;
