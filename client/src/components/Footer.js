import React from 'react'
import '../assets/css/Footer.css'
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap'
import logoDark from '../assets/images/logo'

const Footer = () => {
  return (
    <Navbar className='footer-container'>
      <Row className='ft-row-1'>
        <Col lg={4} className='ft-col-1'>

        </Col >
        <Col lg={4} className='ft-col-2'>
          <div className='my-2'> COMPANY</div>
          <Row >
            <Col lg={6}>
              <ul className=''>
                <li>About us</li>
                <li>Partner program</li>
                <li>Career</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col lg={6}>
              <ul>
                <li>Pricing</li>
                <li>Reviews</li>
                <li>Terms & conditions</li>
              </ul>
            </Col>
          </Row>
        </Col>
        <Col lg={4} className='ft-col-3'>
          <Row className='my-2'>CONTACT</Row>
          <div className='mt-4'>support@educlubone.com</div>
          <p className='my-2 ' style={{ color: "grey" }}>
            Text Goes Here Text Goes Here Text Goes Here
            Text Goes Here Text Goes Here
          </p>
        </Col>
      </Row>
      <hr style={{
        width: '90%',
        height: '2px',
        backgroundColor: 'white',
        border: 'none',
      }} />
      <Row className='ft-row-2'>
        <Col lg={6}>
          <img className='ft-logo' src={logoDark} alt="logo"></img>
        </Col>
        <Col lg={6} className='ft-btn-col'>
          <Button variant="outline-primary" className="navbar-login-btn">Login</Button>
          <Button variant="primary" className="navbar-create-account-btn">Create Account</Button>
        </Col>
      </Row>
    </Navbar>

  )
}

export default Footer