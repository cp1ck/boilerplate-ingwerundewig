import React from 'react';
import PropTypes from 'prop-types';
import InnerHTML from 'dangerously-set-html-content';

import './ScriptModule.scss';

const ScriptModule = ({ script }) => (
    <InnerHTML html={script} className="c-script" />
);

ScriptModule.propTypes = {
    script: PropTypes.string.isRequired
};

export default ScriptModule;
