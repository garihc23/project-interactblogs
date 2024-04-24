import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.js';
import '../../assets/css/common/NavigationBar.css'
import logoDark from '../../assets/images/logo';
import { useSideBar } from '../../contexts/SideBarContext.js';


const NavigationBar = () => {
    const { isLoggedIn, logout, login } = useAuth();
    const { isSidebarVisible } = useSideBar(); 

    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // const handleBlogsManagerClick = () => {
    //     navigate('/manage-blogs');
    // }

    // const handleAdminPanelClick = () => {
    //     navigate('/');
    // }


    return (
        <Navbar
            fluid
            bg="light"
            expand="lg"
            className={`navbar-container ${isSidebarVisible ? 'navbar-shrink' : ''}`}
        >
            <Container >
                <Navbar.Brand className="navbar-brand">
                    <img src={logoDark} className='navbar-logo-img' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='nav-collapse'>
                    {/* <Nav className="navbar-nav ">
                        <Nav.Link className="navbar-link navbar-link-item" onClick={handleAdminPanelClick}>
                            Admin Panel
                        </Nav.Link>
                        <Nav.Link className="navbar-link navbar-link-item" onClick={handleBlogsManagerClick}>
                            Blogs Manager
                        </Nav.Link>
                    </Nav> */}
                    <Nav className='navbar-login'>
                        {isLoggedIn ? (
                            <Button variant="outline-primary" onClick={logout} className="navbar-login-btn">
                                Logout
                            </Button>
                        ) : (
                            <Button variant="outline-primary" as={Link} to="/login" className="navbar-login-btn">
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
