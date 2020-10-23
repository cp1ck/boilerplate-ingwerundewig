import React from 'react';
import PropTypes from 'prop-types';

import Slider from './CustomSlickSlider';

import './CarouselGallery.scss';

const settings = {
    slidesToShow: 1,
    slidesToScroll: 1
};

const CarouselGallery = ({
    media,
    setCurrentIndex,
    setViewerIsOpen
}) => (
    <div className="c-carousel">
        <Slider
            media={media}
            settings={settings}
            setCurrentIndex={setCurrentIndex}
            setViewerIsOpen={setViewerIsOpen}
        />
    </div>
);

CarouselGallery.propTypes = {
    media: PropTypes.arrayOf(
        PropTypes.shape()
    ).isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
    setViewerIsOpen: PropTypes.func.isRequired
};

export default CarouselGallery;
