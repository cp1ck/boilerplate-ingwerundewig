/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';

const GridGallery = ({
    customThumbnailRenderer,
    media
}) => {
    const items = media.map(item => ({
        height: item.getHeight(),
        src: item.getImageUrl(),
        width: item.getWidth(),
    }));
    return (
        <div className="c-grid">
            <Gallery
                photos={items}
                direction="column"
                renderImage={customThumbnailRenderer}
            />
        </div>
    );
};


GridGallery.propTypes = {
    customThumbnailRenderer: PropTypes.func.isRequired,
    media: PropTypes.arrayOf(
        PropTypes.shape({
            height: PropTypes.number,
            src: PropTypes.string,
            width: PropTypes.number,
        })
    ).isRequired
};


export default GridGallery;
