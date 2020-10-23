import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';

import Image from '../Image/Image';

import './BadgesModule.scss';

const BadgesModule = ({
    logos
}) => (
    <div className="c-badges">
        <Container>
            {logos && (
                <Row>
                    {logos.map((logo) => {
                        const icon = logo.getIcon();
                        const image = <Image className="c-logo" src={icon.getImageUrl()} alt={icon.getAlt()} />;
                        // const image = <SVG className="c-logo" src={icon.src} />;
                        const url = logo.getUrl();

                        if (url) {
                            return (
                                <Col xs key={logo.getId()}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">{image}</a>
                                </Col>
                            );
                        }
                        return (
                            <Col xs key={logo.getId()}>
                                {image}
                            </Col>
                        );
                    })
                    }
                </Row>
            )}
        </Container>
    </div>
);

BadgesModule.propTypes = {
    logos: PropTypes.arrayOf(PropTypes.shape(
        {
            icon: PropTypes.object.isRequired
        }
    )).isRequired,
};


export default BadgesModule;
