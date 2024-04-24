import React from 'react'
import '../../assets/css/pages/home/SupportSection.css'
import { Row, Col, Card, Button } from 'react-bootstrap'

const SupportSection = () => {
    return (
        <div>
            <Row className='sup-container'>
                <Card className='sup-story-card'>
                    <h5>
                        Read our story
                    </h5>
                    <p>
                        Find out why thousands trust Edu Club One for their preparation
                    </p>
                    <Button>
                        About Us ->
                    </Button>
                </Card>
                <Card className='sup-help-card'>
                    <h5>
                        Help Center
                    </h5>
                    <p>
                        Help topics, getting started guides and FAQs.
                    </p>
                    <Button>
                        View help center
                    </Button>
                </Card>
            </Row>

        </div>
    )
}

export default SupportSection