import React  from 'react'
import { useNavigate } from 'react-router-dom';
import '../../assets/css/pages/home/Insights.css';
import { Row, Col, Card, Button } from 'react-bootstrap';
import cardImg from '../../assets/images/insight-card-img.png';

const Insights = () => {
    const navigate = useNavigate();
    const handleInsights =() =>{
        navigate('/blogs');
    }

    return (
        <div className='insights-container'>
            <Row className='insights-heading'>
                Latest insights
            </Row>
            <Row className='insights-card-container'>
                <Col lg={4} className='insgihts-card-col'>
                    <Card className='insights-card'>
                        <img src={cardImg} alt="Card Image" />
                        <div>
                            <div className='insgihts-card-heading'>
                                Text Heading Goes Here
                            </div>
                            <div className='insgihts-card-description'>
                                Text Goes Here Text Goes Here
                                Text Goes Here Text Goes Here
                                Text Goes Here Text Goes Here...
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col lg={4} className='insgihts-card-col'>
                    <Card className='insights-card'>
                        <img src={cardImg} alt="Card Image" />
                        <div>
                            <div className='insgihts-card-heading'>
                                Text Heading Goes Here
                            </div>
                            <div className='insgihts-card-description'>
                                Text Goes Here Text Goes Here
                                Text Goes Here Text Goes Here
                                Text Goes Here Text Goes Here...
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col lg={4} className='insgihts-card-col'>
                    <Card className='insights-card'>
                        <img src={cardImg} alt="Card Image" />
                        <div>
                            <div className='insgihts-card-heading'>
                                Text Heading Goes Here
                            </div>
                            <div className='insgihts-card-description'>
                                Text Goes Here Text Goes Here
                                Text Goes Here Text Goes Here
                                Text Goes Here Text Goes Here...
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        <Row className='insights-btn-container'>
            <Button className='insights-btn' onClick={handleInsights}>
                View all insgihts 
            </Button>
        </Row>

        </div>
    )
}

export default Insights