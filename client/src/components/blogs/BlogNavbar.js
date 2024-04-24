import React from 'react'
import '../../assets/css/blogs/BlogNavbar.css';
import { Container, Navbar, Nav, Form, FormControl, Button, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import logoDark from '../../assets/images/logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faPen,
    faNewspaper,
    faContactCard,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FaSearch } from 'react-icons/fa';
import GlobalLoadingIndicator from '../common/GlobalLoadingIndicatior';

const BlogNavbar = () => {
    return (
        <div>
            <Navbar bg="black" expand="lg" className='blog-nav-container'>
                <Container>
                    <Navbar.Brand>
                        <img src={logoDark} className='blog-nav-logo' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="blog-navbar-nav">
                            <Nav.Link className='blog-nav-link blog-nav-link-item' as={Link} to="/blogs">
                                <FontAwesomeIcon icon={faHome} /> Home
                            </Nav.Link>
                            <Nav.Link className='blog-nav-link blog-nav-link-item' as={Link} to="/about-us">
                                 <FontAwesomeIcon icon={faInfoCircle} /> About Us
                            </Nav.Link>
                            <Nav.Link className='blog-nav-link blog-nav-link-item' href="#BlogHome">
                                 <FontAwesomeIcon icon={faContactCard} /> Contact
                            </Nav.Link>
                            <Nav.Link className='blog-nav-link blog-nav-link-item' as={Link} to="/newsletter">
                                 <FontAwesomeIcon icon={faNewspaper} /> Newsletter
                            </Nav.Link>
                            <Nav.Link className='blog-nav-link blog-nav-link-item' href="#BlogHome">
                                 <FontAwesomeIcon icon={faPen} /> Be a writer!
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline>
                        <Row className='blog-nav-search-container'>
                            <FormControl type="text" placeholder="  Search" className="blog-nav-search-bar" />
                            <Button className='blog-nav-search-btn' variant="outline-primary">
                                <FaSearch size={20} />
                            </Button>
                        </Row>
                    </Form>
                </Container>
            </Navbar>
            <GlobalLoadingIndicator />
        </div>
    )
}

export default BlogNavbar