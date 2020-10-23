import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import './QuoteModule.scss';


const QuoteModule = ({
    authorName,
    authorOccupation,
    text
}) => (
    <div className="c-quote">
        <Container>
            <Row className="align-items-center" as="blockquote">
                <Col md={2} />
                <Col md={8}>
                    <blockquote className="c-quote__text">
                        <p>{text}</p>
                    </blockquote>
                    {authorName && (
                        <cite className="c-quote__author">
                            {authorName}
                            {authorOccupation && (` - ${authorOccupation}`)}
                        </cite>

                    )}
                </Col>
                <Col md={2} />
            </Row>
        </Container>
    </div>
);

QuoteModule.propTypes = {
    authorName: PropTypes.string,
    authorOccupation: PropTypes.string,
    text: PropTypes.string.isRequired,
};

QuoteModule.defaultProps = {
    authorName: '',
    authorOccupation: '',
};

export default QuoteModule;
