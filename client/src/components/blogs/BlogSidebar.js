import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../assets/css/blogs/BlogSidebar.css';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import dummyImg from '../../assets/images/features-dummy.png';
import facebook from '../../assets/icons/facebook.png';
import instagran from '../../assets/icons/instagram.png';

const BlogSidebar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <div>
            <Container className='blog-side-container'>
                <Row className='side-search-row'>
                    <Col>
                        <Form inline>
                            <Row className='blog-side-search-container'>
                                <FormControl type="text" placeholder="  Search" className="blog-side-search-bar" />
                                <Button className='blog-side-search-btn' variant="outline-primary">
                                    <FaSearch size={20} />
                                </Button>
                            </Row>
                        </Form>
                        <Row className='blog-side-poster-row'>
                            <img className='blog-side-poster-img' src={dummyImg} alt="Poster" />
                            <img className='blog-side-poster-img' src={dummyImg} alt="Poster" />
                        </Row><hr/>
                        <Row className='blog-side-icons-row'>
                            <img className='blog-side-icons' src={facebook} alt='facebook' href="#" />
                            <img className='blog-side-icons' src={instagran} alt='instagran' href="#" />
                            <img className='blog-side-icons' src={facebook} alt={facebook} href="#" />
                        </Row>
                        <hr/>
                        <Row>
                            <div className='blog-side-archives'> Archives</div>
                            {/* Calendar */}
                            <div className='blog-side-calendar-container'>
                            <Calendar
                                className="blog-side-calendar"
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                            />
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BlogSidebar