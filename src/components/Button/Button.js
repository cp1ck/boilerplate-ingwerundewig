import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({
    isExternal,
    goTo,
    text,
    theme,
    url
}) => {
    const handleClick = (event) => {
        if (!isExternal) {
            event.preventDefault();
            goTo(url);
        }
        return null;
    };

    return (
        <a
            className={`c-button c-button-${theme}`}
            href={url}
            onClick={e => handleClick(e)}
            target={(isExternal ? '_blank' : '')}
            rel="noopener noreferrer"
        >
            {text}
        </a>
    );
};

Button.propTypes = {
    goTo: PropTypes.func.isRequired,
    isExternal: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Button;
