import React from 'react';
import PropTypes from 'prop-types';

import Media from '../Media/Media';

import './TeaserModule.scss';

const TeaserModule = ({
    description, image, goTo, title
}) => (
    <div className="c-teaser" onClick={() => goTo()}>
        <div className="c-teaser__image">
            {image && (
                <Media media={image} />
            )}
        </div>
        <div className="c-teaser__body">
            <h4 className="c-teaser__title">
                {title}
            </h4>
            <div className="c-teaser__text">
                {description }
            </div>
        </div>
    </div>
);

TeaserModule.propTypes = {
    description: PropTypes.string,
    image: PropTypes.shape(),
    goTo: PropTypes.func.isRequired,
    title: PropTypes.string,
};

TeaserModule.defaultProps = {
    description: '',
    image: null,
    title: '',
};

export default TeaserModule;
