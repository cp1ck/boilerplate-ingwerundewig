import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import TeamMember from './TeamMember';

import 'slick-carousel/slick/slick.css';
import './TeamModule.scss';


const TeamModule = ({
    members
}) => {
    const sildesQuantity = members.length < 5 ? members.length : 5;
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: sildesQuantity,
        slidesToScroll: sildesQuantity,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    dots: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                }
            }
        ]
    };

    return (
        <div className="c-team">
            <div className="container">
                <Slider {...settings}>
                    {members.map(member => (
                        <TeamMember
                            image={member.getImage()}
                            key={member.getId()}
                            name={member.getName()}
                            position={member.getPosition()}
                            socials={member.getSocials()}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};


TeamModule.propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape({
        // bio: PropTypes.string,
        image: PropTypes.shape({
            alt: PropTypes.string,
            src: PropTypes.string
        }),
        name: PropTypes.string,
        position: PropTypes.string,
        socials: PropTypes.object
    })).isRequired
};

export default TeamModule;
