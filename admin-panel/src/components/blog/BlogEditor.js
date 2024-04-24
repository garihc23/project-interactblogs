//src/componentss/BlogEditor.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import Select from 'react-select'; // Import react-select
import { useAuth } from '../../auth/AuthContext.js';
import { createBlogPost, updateBlogPost } from '../../api/blogApi.js'; // Import the createBlogPost function
import { getAllAuthorsApi } from '../../api/authorApi';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import '../../assets/css/blog/BlogEditor.css'; // Import the CSS file

const MAX_IMAGE_SIZE = 500 * 1024; // 500 KB
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/uploads';

const BlogEditor = ({ onClose, onPublishSuccess, selectedBlog }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    shortDescription: '',
    content: '',
    category: '',
    date: '',
    time: '',
    author: '',
    authorId: '',
    headerImage: null,
  });

  const [authorList, setAuthorList] = useState([]);
  const [authorData, setAuthorData] = useState({
    name: '',
    email: '',
    authorID: '',
    authorDP: null,
  });

  useEffect(() => {
    console.log("SELECTED BLOG EDITOR", selectedBlog);
    if (selectedBlog) {
      // If selectedBlog is provided, set initial values for editing
      setBlogData({
        title: selectedBlog.title,
        shortDescription: selectedBlog.shortDescription,
        content: selectedBlog.content,
        category: selectedBlog.category,
        date: selectedBlog.date,
        time: selectedBlog.time,
        author: selectedBlog.author,
        authorId: selectedBlog.authorId,
        headerImage: selectedBlog.headerImage,
      });
    }
  }, [selectedBlog]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        // const token = localStorage.getItem('token');
        const authors = await getAllAuthorsApi();
        const authorOptions = authors.map((author) => ({
          value: author.authorId,
          label: author.name,
          email: author.email,
          authorDP: author.authorDP,
        }));
        setAuthorList(authorOptions);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleContentChange = (content) => {
    setBlogData((prevData) => ({ ...prevData, content }));
  };

  // const handleTimeChange = (time) => {
  //   setSelectedTime(time);
  //   // If you want to update the form state immediately, you can call handleInputChange here
  //   //  handleInputChange({ target: { name: 'time', value: time } });
  // };

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    console.log("FILEE--", file);
    // Check file type
    if (file && /\.(png|jpeg|jpg)$/i.test(file.name)) {
      // Check file size
      if (file.size <= MAX_IMAGE_SIZE) {
        setBlogData((prevData) => ({ ...prevData, headerImage: file }));
      } else {
        alert('Image size exceeds the allowed limit (500 KB).');
      }
    } else {
      alert('Invalid file format. Please choose a .png or .jpeg image.');
    }
  };

  const handleAuthorSelect = (selectedAuthor) => {
    console.log("SELCTED", selectedAuthor)
    setBlogData((prevData) => ({
      ...prevData,
      author: selectedAuthor,
      authorId: selectedAuthor ? selectedAuthor.value : '',
    }));
    setAuthorData((prevData) => ({
      // ...prevData,
      name: selectedAuthor,
      authorId: selectedAuthor ? selectedAuthor.value : '',
      email: selectedAuthor ? selectedAuthor.email : '',
      authorDP: selectedAuthor ? selectedAuthor.authorDP : '',
    }));
  };

  const handlePublish = async () => {
    if (selectedBlog) {
      // Update existing blog post
      try {
        // Format the date to YYYY-MM-DD
        const formattedDate = new Date(blogData.date).toISOString().split('T')[0];
        const formattedTime = blogData.time;

        // Combine date and time into a single string

        // Update blogData with formatted date and time
        setBlogData((prevData) => ({ ...prevData, date: formattedDate, time: formattedTime }));

        // Get the authentication token
        const token = localStorage.getItem('token');

        // Use the updateBlogPost function from your blogApi.js file
        await updateBlogPost(selectedBlog.postId, blogData, token);

        alert('Blog updated successfully!');
        onPublishSuccess();
        onClose();
        // You can redirect the user to the blog list page or perform any other action
      } catch (error) {
        console.error('Error updating blog:', error);
        alert('Error updating blog. Please try again.');
      }
    } else {
      try {
        // Format the date to YYYY-MM-DD
        const formattedDate = new Date(blogData.date).toISOString().split('T')[0];
        const formattedTime = blogData.time;

        // Combine date and time into a single string

        // Update blogData with formatted date and time
        setBlogData((prevData) => ({ ...prevData, date: formattedDate, time: formattedTime }));

        // Get the authentication token
        const token = localStorage.getItem('token');

        // Use the createBlogPost function from your blogApi.js file
        await createBlogPost(blogData, token);

        alert('Blog published successfully!');
        onPublishSuccess();
        // onClose();
        // You can redirect the user to the blog list page or perform any other action
      } catch (error) {
        console.error('Error publishing blog:', error);
        alert('Error publishing blog. Please try again.');
      }
    }
  };
  const handleCloseBlog = () => {
    try {
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container className="blog-edit-container">
      <Row>
        <h2 className="page-title">Blog Editor Page</h2>
      </Row>
      <Form encType="multipart/form-data">
        <Form.Group controlId="headerImage" className="form-group">
          <Form.Label className="label">Header Image (only .png or .jpeg, max 500 KB)</Form.Label>
          <Form.Control
            type="file"
            accept=".png, .jpeg, .jpg"
            name="headerImage"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group controlId="title" className="form-group">
          <Form.Label className="label">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="shortDescription" className="form-group">
          <Form.Label className="label">Short Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter short description"
            name="shortDescription"
            value={blogData.shortDescription}
            onChange={handleInputChange}
            className="textarea"
          />
        </Form.Group>

        <Form.Group controlId="content" className="form-group">
          <Form.Label className="label">Content</Form.Label>
          <ReactQuill
            theme="snow"
            value={blogData.content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image', 'video'],
                [{ 'color': [] }, { 'background': [] }],
                // [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],
              ],
            }}
            className="quill-editor "
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label className="label">Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            name="category"
            value={blogData.category}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Row>
          <Col lg={3}>
            <Form.Group controlId="date">
              <Form.Label className="label">Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={blogData.date}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group controlId="time">
              <Form.Label className="label">Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={blogData.time}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Form.Group controlId="author">
              <Form.Label className="label">Author</Form.Label>
              <Select
                options={authorList}
                value={blogData.author}
                onChange={handleAuthorSelect}
                isSearchable
                placeholder="Select or type to search"
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="authorId">
              <Form.Label className="label">Author ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author ID"
                name="authorId"
                value={blogData.authorId}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="authorEmail">
              <Form.Label className="label">Author Email</Form.Label>
              <Form.Control
                // options={authorList}
                type="text"
                placeholder="Author Email"
                name="authorEmail"
                value={authorData.email}
                // value={selectedAuthor ? selectedAuthor.authorEmail : ''}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col lg={5}>
            <img
              src={authorData.authorDP ? `${UPLOAD_URL}/authorImages/${authorData.authorDP}` : `${UPLOAD_URL}/authorImages/default-profile.png`}
              alt={`Author ${authorData.name}`}
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col lg={5}>
            <Form.Group controlId="author">
              <Form.Label className="label">Author</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {blogData.author || 'Select Author'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {authorList.map((author) => (
                    <Dropdown.Item
                      key={author.authorId}
                      onClick={() => handleAuthorSelect(author)}
                    >
                      {author.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group controlId="authorId">
              <Form.Label className="label">Author ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author ID"
                name="authorId"
                value={blogData.authorId}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row> */}
        {/* <Row>
          <Col lg={5}>
            <Form.Group controlId="author">
              <Form.Label className="label">Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author Name"
                name="author"
                value={blogData.author}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group controlId="authorId">
              <Form.Label className="label">Author ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author ID"
                name="authorId"
                value={blogData.authorId}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row> */}

        <Row>
          <Col lg={2}>
            <Button
              variant="primary"
              onClick={handlePublish}
              className='blog-edit-btn'>
              Publish
            </Button>
          </Col>
          <Col lg={2}>
            <Button
              className='blog-edit-btn'
              variant="primary danger"
              onClick={handleCloseBlog}
            >
              Close Blog
            </Button>
          </Col>
        </Row>
      </Form>
    </Container >
  );
};

export default BlogEditor;
