import React from 'react';
import PropTypes from 'prop-types';
import Slider from './CustomSlickSlider';

import './SliderGallery.scss';

const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
};

const SliderGallery = ({
    media,
    setCurrentIndex,
    setViewerIsOpen
}) => (
    <div className="c-slider">
        <Slider
            media={media}
            settings={settings}
            setCurrentIndex={setCurrentIndex}
            setViewerIsOpen={setViewerIsOpen}
        />
    </div>

);

SliderGallery.propTypes = {
    media: PropTypes.arrayOf(
        PropTypes.shape()
    ).isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
    setViewerIsOpen: PropTypes.func.isRequired
};

export default SliderGallery;
