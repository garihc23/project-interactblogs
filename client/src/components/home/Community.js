import React from 'react'
import '../../assets/css/pages/home/Community.css'
import { Row, Col } from 'react-bootstrap'

const Community = () => {
    return (
        <div>
            <Row className='community-container'>
                <Col lg={1} />
                <Col lg={4} className='community-heading-col'>
                    <div className='community-heading'>
                        Our community is a testament to our commitment.
                    </div>
                </Col>
                <Col lg={1} />
                <Col lg={6}>
                    <div className='community-details'>
                        <div className='community-numbers'>
                            1000
                        </div>
                        <div className='community-description'>
                            Students who study on the platform
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Community