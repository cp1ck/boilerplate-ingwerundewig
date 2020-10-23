import React from 'react';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import './TableModule.scss';

const TableModule = ({ text }) => (
    <ReactMarkdown className="c-table table" plugins={[gfm]} source={text} />
);

TableModule.propTypes = {
    text: PropTypes.string.isRequired
};

export default TableModule;
