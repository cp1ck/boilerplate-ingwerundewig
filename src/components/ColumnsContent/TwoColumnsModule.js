/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import './ColumnsModule.scss';

const TwoColumnsModule = ({
    left, right, sizes
}) => (
    <div className="c-columns">
        <Row xs={1}>
            {left && <Col sm={sizes[0]}>{left}</Col>}
            {right && <Col sm={sizes[1]}>{right}</Col>}
        </Row>
    </div>
);

TwoColumnsModule.propTypes = {
    left: PropTypes.array,
    right: PropTypes.array,
    sizes: PropTypes.arrayOf(PropTypes.string)
};

TwoColumnsModule.defaultProps = {
    left: [],
    right: [],
    sizes: ['6', '6']
};

export default TwoColumnsModule;
