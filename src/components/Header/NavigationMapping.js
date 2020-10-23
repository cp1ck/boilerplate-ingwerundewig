import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

const NavigationMapping = ({
    navigation,
    onCategoryChange
}) => (
    navigation.map((item, index) => (
        <Nav.Link
            className="navigation__item"
            eventKey={index}
            href={`/${item.getPath()}`}
            key={item.getId()}
            onClick={(event) => {
                event.preventDefault();
                onCategoryChange(item.getPath());
            }}
        >
            {item.getTitle()}
        </Nav.Link>
    ))
);

NavigationMapping.propTypes = {
    navigation: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        path: PropTypes.string
    })).isRequired,
    onCategoryChange: PropTypes.func.isRequired,
};

export default NavigationMapping;
