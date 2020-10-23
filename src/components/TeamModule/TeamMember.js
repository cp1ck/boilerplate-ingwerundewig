/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image/Image';
import SocialIcons from '../SocialModule/SocialIcons';

import './TeamMember.scss';

const TeamMember = ({
    image, name, position, socials
}) => (
    <div className="slide">
        <div className="c-team-member">
            <div className="c-team-member__media">
                <div className="c-team-member__background">
                    <Image src={image.getImageUrl()} alt={image.getAlt()} />
                </div>
            </div>
            <div className="c-team-member__text">
                <h3 className="c-team-member__headline">
                    {name}
                </h3>
                {position && (
                    <p className="c-team-member__subline">
                        {position}
                    </p>
                )}
                {socials && (
                    <div className="c-team-member__socials">
                        <SocialIcons socials={socials} />
                    </div>
                )}
            </div>
        </div>
    </div>
);


TeamMember.propTypes = {
    image: PropTypes.shape().isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    socialMediaService: PropTypes.shape({
        getLastTweet: PropTypes.func
    }).isRequired,
    socials: PropTypes.object
};

TeamMember.defaultProps = {
    socials: null
};

export default TeamMember;
