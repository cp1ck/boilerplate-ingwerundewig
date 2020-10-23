/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import './ColumnsModule.scss';

const ThreeColumnsModule = ({
    left, center, right, sizes
}) => (
    <div className="c-columns">
        <Row xs={1}>
            {left && <Col sm={sizes[0]}>{left}</Col>}
            {center && <Col sm={sizes[1]}>{center}</Col>}
            {right && <Col sm={sizes[2]}>{right}</Col>}
        </Row>
    </div>
);

ThreeColumnsModule.propTypes = {
    left: PropTypes.array,
    center: PropTypes.array,
    right: PropTypes.array,
    sizes: PropTypes.arrayOf(PropTypes.string)
};

ThreeColumnsModule.defaultProps = {
    left: [],
    center: [],
    right: [],
    sizes: ['4', '4', '4']
};

export default ThreeColumnsModule;
