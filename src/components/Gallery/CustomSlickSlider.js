import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { isMobile } from 'react-device-detect';

import Media from '../Media/Media';

import 'slick-carousel/slick/slick.css';
import './CustomSlickSlider.scss';

const defaultSettings = {
    className: 'c-slick',
    dots: true,
    arrows: !isMobile,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
};

const CustomSlickSlider = ({
    media,
    settings,
    setCurrentIndex,
    setViewerIsOpen
}) => {
    const settingProps = { ...defaultSettings, ...settings };
    return (
        <Slider {...settingProps}>
            {media.map((item, index) => (
                <div
                    key={item.getId()}
                    className="slide"
                    onClick={() => {
                        setCurrentIndex(index);
                        setViewerIsOpen(true);
                    }}
                >
                    <Media media={item} options={{ noOptimization: true }} />
                </div>
            ))
            }
        </Slider>
    );
};

CustomSlickSlider.propTypes = {
    media: PropTypes.arrayOf(
        PropTypes.shape()
    ).isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
    setViewerIsOpen: PropTypes.func.isRequired,
    settings: PropTypes.shape(),
};

CustomSlickSlider.defaultProps = {
    settings: []
};

export default CustomSlickSlider;
