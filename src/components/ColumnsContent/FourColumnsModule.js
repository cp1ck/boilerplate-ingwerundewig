/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import './ColumnsModule.scss';

const FourColumnsModule = ({
    left, right, centerLeft, centerRight, sizes
}) => (
    <div className="c-columns">
        <Row xs={1}>
            {left && <Col sm={sizes[0]}>{left}</Col>}
            {centerLeft && <Col sm={sizes[1]}>{centerLeft}</Col>}
            {centerRight && <Col sm={sizes[2]}>{centerRight}</Col>}
            {right && <Col sm={sizes[3]}>{right}</Col>}
        </Row>
    </div>
);

FourColumnsModule.propTypes = {
    left: PropTypes.array,
    centerLeft: PropTypes.array,
    centerRight: PropTypes.array,
    right: PropTypes.array,
    sizes: PropTypes.arrayOf(PropTypes.string)
};

FourColumnsModule.defaultProps = {
    left: [],
    centerLeft: [],
    centerRight: [],
    right: [],
    sizes: ['3', '3', '3', '3']
};

export default FourColumnsModule;
