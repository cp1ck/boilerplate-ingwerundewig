
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Player from 'react-player';

const Video = ({ config }) => {
    const playerRef = useRef(null);
    return (
        <Player
            ref={playerRef}
            color="#F8635A"
            controls
            light={config.imageUrl}
            playing
            url={config.videoUrl}
            onEnded={() => playerRef.current.showPreview()}
            width={config.width || 'inherit'}
            height={config.height || '100vh'}
        />
    );
};

Video.propTypes = {
    config: PropTypes.shape().isRequired,
};

export default Video;
