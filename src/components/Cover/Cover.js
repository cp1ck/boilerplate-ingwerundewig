/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Media from '../Media/Media';

import './Cover.scss';

const Cover = ({
    button,
    goTo,
    headline,
    media,
    subheadline,
    subline
}) => (

    <section className="c-cover">
        <div className="c-cover__background">
            <Media media={media} className="c-cover__media" />
        </div>
        <div className="c-cover__content">
            {headline && (<h2>{headline}</h2>)}
            {subheadline && (<h3>{subheadline}</h3>)}
            {subline && (<div className="c-cover__content-text">{subline}</div>)}
            {button && (
                <Button
                    goTo={goTo}
                    isExternal={button.getIsExternal()}
                    key={button.getId()}
                    text={button.getText()}
                    theme={button.getTheme()}
                    url={button.getUrl()}
                />
            )}
        </div>
    </section>
);


Cover.propTypes = {
    button: PropTypes.object,
    goTo: PropTypes.func.isRequired,
    headline: PropTypes.string,
    media: PropTypes.shape().isRequired,
    subheadline: PropTypes.string,
    subline: PropTypes.string
};

Cover.defaultProps = {
    button: null,
    headline: '',
    subheadline: '',
    subline: ''
};

export default Cover;
