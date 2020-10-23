import React from 'react';
import {
    Accordion, Button, Card, Row, Col
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './AccordionItem.scss';

const AccordionItem = ({
    image, index, name, text
}) => (
    <div className="c-accordion-item">
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="accordion" eventKey={index + 1}>
                    {name}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index + 1}>
                <Card.Body>
                    <Row xs={1} sm={(text && image) ? 2 : 1}>
                        {image && <Col><img className="c-accordion-item__img" alt={image.getName()} src={image.getImageUrl()} /></Col>}
                        {text && <Col><div className="c-accordion-item__text">{text}</div></Col>}
                    </Row>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </div>
);

AccordionItem.propTypes = {
    image: PropTypes.shape(),
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string
};

AccordionItem.defaultProps = {
    image: null,
    text: ''
};

export default AccordionItem;
