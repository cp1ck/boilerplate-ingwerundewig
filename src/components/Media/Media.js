import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image/Image';
import Video from '../Video/Video';


const Media = ({ className, media, options }) => {
    const config = {
        imageUrl: media.getImageUrl(),
        videoUrl: media.getVideoUrl(),
    };
    return (
        <>
            {media.isVideo() ? (
                <Video config={config} />
            ) : (
                <Image
                    alt={media.getAlt()}
                    className={className}
                    imageHeight={media.getHeight()}
                    imageWidth={media.getWidth()}
                    noOptimization={options ? !!options.noOptimization : false}
                    src={media.getImageUrl()}
                />
            )}
        </>
    );
};

Media.propTypes = {
    className: PropTypes.string,
    media: PropTypes.shape().isRequired,
    options: PropTypes.shape(),
};
Media.defaultProps = {
    className: '',
    options: {},
};

export default Media;
