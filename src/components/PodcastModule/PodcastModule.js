import React from 'react';
import PropTypes from 'prop-types';
import ScriptTag from 'react-script-tag';

const PodcastModule = ({ title, url }) => {
    const fileType = url.split('.').pop();
    const config = {
        episode: {
            media: { [fileType]: url },
            title
        }
    };
    const configJson = JSON.stringify(config);
    if (!configJson) {
        return <div />;
    }
    return (
        <div className="c-podcast">
            <ScriptTag
                className="podigee-podcast-player"
                src="https://cdn.podigee.com/podcast-player/javascripts/podigee-podcast-player.js"
                data-configuration={configJson}
            />
        </div>
    );
};

PodcastModule.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string.isRequired
};

PodcastModule.defaultProps = {
    title: ''
};

export default PodcastModule;
