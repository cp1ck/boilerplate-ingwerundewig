/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Nav } from 'react-bootstrap';

import './SocialIcons.scss';

const SocialIcons = ({ className, socials }) => (
    <Nav className={`c-socials ${className}`}>
        {socials.facebook && (
            <Nav.Link href={socials.facebook} target="_blank" rel="noopener noreferrer" className="c-socials__item">
                <i className="fab fa-facebook" />
            </Nav.Link>
        )}
        {socials.instagram && (
            <Nav.Link href={socials.instagram} target="_blank" rel="noopener noreferrer" className="c-socials__item">
                <i className="fab fa-instagram" />
            </Nav.Link>
        )}
        {socials.twitter && (
            <Nav.Link href={socials.twitter} target="_blank" rel="noopener noreferrer" className="c-socials__item">
                <i className="fab fa-twitter" />
            </Nav.Link>
        )}
    </Nav>
);

SocialIcons.propTypes = {
    className: PropTypes.string,
    socials: PropTypes.object.isRequired,
};

SocialIcons.defaultProps = {
    className: PropTypes.string,
};

export default SocialIcons;
