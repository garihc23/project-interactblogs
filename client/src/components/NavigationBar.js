import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHandshake, faUserGraduate, faBullhorn, faBook } from '@fortawesome/free-solid-svg-icons';

import '../assets/css/NavigationBar.css'
/* import logo from '../assets/images/logo.png' */
import logoDark from '../assets/images/logo';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand className="navbar-brand">
          <img src={logoDark} className='navbar-logo-img' />
          {/* <img src={logoDark} className='navbar-logo-img' style={{ width: '200px', height: '50px' }} /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav ">
            <Nav.Link className="navbar-link navbar-link-item" href="#home">
            <FontAwesomeIcon icon={faHome} /> Home
            </Nav.Link>
            <NavDropdown title={<span><FontAwesomeIcon icon={ faHandshake } /> Our Services</span>} id="services-dropdown" className="navbar-dropdown navbar-link-item">
              <NavDropdown.Item className="navbar-dropdown-item" href="#action1">Action 1</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action2">Action 2</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action3">Action 3</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span><FontAwesomeIcon icon={ faUserGraduate } /> Skill Club</span>} id="skillclub-dropdown" className="navbar-dropdown navbar-link-item">
              <NavDropdown.Item className="navbar-dropdown-item" href="#action1">Action 1</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action2">Action 2</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action3">Action 3</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span><FontAwesomeIcon icon={ faBullhorn } /> Opportunities</span>}id="opportunities-dropdown" className="navbar-dropdown navbar-link-item">
              <NavDropdown.Item className="navbar-dropdown-item" href="#action1">Action 1</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action2">Action 2</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action3">Action 3</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span><FontAwesomeIcon icon={ faBook} /> Study Material</span>} id="study-dropdown" className="navbar-dropdown navbar-link-item">
              <NavDropdown.Item className="navbar-dropdown-item" href="#action1">Action 1</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action2">Action 2</NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown-item" href="#action3">Action 3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='navbar-login'>
            <Button variant="outline-primary" className="navbar-login-btn">Login</Button>
            <Button variant="primary" className="navbar-create-account-btn">Create Account</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
