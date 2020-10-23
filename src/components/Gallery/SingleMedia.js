import React from 'react';
import PropTypes from 'prop-types';
import Media from '../Media/Media';

import './SingleMedia.scss';

const SingleMedia = ({ media }) => (
    <div className="c-media-module__single-media">
        <Media
            className="c-media-module__single-media-img"
            media={media}
        />
    </div>
);


SingleMedia.propTypes = {
    media: PropTypes.shape().isRequired,
};


export default SingleMedia;
