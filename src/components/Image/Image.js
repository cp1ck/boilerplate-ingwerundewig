import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import { isIE, isIOS, isSafari } from 'react-device-detect';

import './Image.scss';


const Image = ({
    alt,
    className,
    // eslint-disable-next-line no-unused-vars
    imageHeight,
    imageWidth,
    src,
    noOptimization,
}) => {
    const format = (isIE || isIOS || isSafari) ? '' : 'fm=webp&';
    const optimzeSrc = (width) => {
        if (width && imageWidth) {
            if (width < imageWidth) {
                return `${src}?${format}w=${Math.round(width)}`;
            }
            return `${src}?${format}w=${Math.round(imageWidth)}`;
        }
        return `${src}?${format}w=150`;
    };

    const imageClassNames = classNames(
        'c-img',
        className
    );

    return (
        noOptimization ? (
            <img
                className={imageClassNames}
                src={src}
                alt={alt}
                draggable="false"
            />
        ) : (

            <ReactResizeDetector handleWidth>
                {({ width }) => {
                    if (!width || width === 0) {
                        return <div className={imageClassNames} />;
                    }
                    return (
                        <img
                            className={imageClassNames}
                            src={optimzeSrc(width)}
                            alt={alt}
                            draggable="false"
                        />
                    );
                }}
            </ReactResizeDetector>
        )
    );
};

Image.propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    noOptimization: PropTypes.bool,
    src: PropTypes.string.isRequired,
};

Image.defaultProps = {
    alt: '',
    className: '',
    imageHeight: 100,
    imageWidth: 100,
    noOptimization: false,
};

export default Image;
