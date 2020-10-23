/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { isIE, isIOS, isSafari } from 'react-device-detect';
import CarouselGallery from './CarouselGallery';
import GridGallery from './GridGallery';
import SliderGallery from './SliderGallery';
import SingleMedia from './SingleMedia';

import './ImageGallery.scss';


class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    setCurrentIndex = (value) => {
        this.setState({
            currentIndex: value
        });
    }

    setViewerIsOpen = (value) => {
        this.setState({
            viewerIsOpen: value
        });
    }

    closeLightbox = () => {
        this.setCurrentIndex(0);
        this.setViewerIsOpen(false);
    };

    openLightbox = (event, { index }) => {
        this.setCurrentIndex(index);
        this.setViewerIsOpen(true);
    };

    customStyles = {
        navigationNext: base => ({
            ...base,
            borderRadius: 0
        }),
        navigationPrev: base => ({
            ...base,
            borderRadius: 0
        }),
    };

    customThumbnailRenderer = (item) => {
        const format = (isIE || isIOS || isSafari) ? '' : 'fm=webp&';
        const style = {
            margin: '2px',
            display: 'block',
            position: 'absolute',
            left: item.left,
            top: item.top,
            cursor: 'pointer'
        };
        return (
            <div
                key={item.index}
                onClick={(e) => {
                    this.openLightbox(e, { index: item.index });
                }}
            >
                <img
                    alt={`gallery-${item.index}`}
                    height={item.photo.height}
                    src={`${item.photo.src}?${format}w=${Math.floor(item.photo.width)}&h=${Math.floor(item.photo.height)}`}
                    width={item.photo.width}
                    style={style}
                />
            </div>
        );
    };

    render() {
        const {
            displayOptions,
            media,
        } = this.props;
        const {
            currentIndex,
            viewerIsOpen,
        } = this.state;

        const format = (isIE || isIOS || isSafari) ? '' : 'fm=webp&';
        return (
            <>
                {media.length === 1 ? (
                    <SingleMedia media={media[0]} />
                ) : (
                    <>
                        {displayOptions === 'grid' && (
                            <GridGallery
                                media={media}
                                customThumbnailRenderer={this.customThumbnailRenderer}
                                openLightbox={this.openLightbox}
                            />
                        )}
                        {displayOptions === 'slider' && (
                            <SliderGallery
                                media={media}
                                setCurrentIndex={this.setCurrentIndex}
                                setViewerIsOpen={this.setViewerIsOpen}
                            />

                        )}
                        {displayOptions === 'carousel' && (
                            <CarouselGallery
                                media={media}
                                setCurrentIndex={this.setCurrentIndex}
                                setViewerIsOpen={this.setViewerIsOpen}
                            />
                        )}
                        <ModalGateway>
                            {viewerIsOpen && (
                                <Modal onClose={this.closeLightbox}>
                                    <Carousel
                                        currentIndex={currentIndex}
                                        styles={this.customStyles}
                                        views={media.map((x) => {
                                            const height = x.height > window.innerHeight ? window.innerHeight : x.height;
                                            const width = x.width > window.innerHeight ? window.innerHeight : x.width;
                                            const src = `${x.url}?${format}w=${Math.floor(width)}&h=${Math.floor(height)}`;
                                            const caption = x.description;
                                            return ({
                                                src,
                                                caption
                                            });
                                        })}
                                    />
                                </Modal>
                            )}
                        </ModalGateway>
                    </>
                )}
            </>
        );
    }
}

ImageGallery.propTypes = {
    displayOptions: PropTypes.string,
    media: PropTypes.arrayOf(
        PropTypes.shape()
    ).isRequired,
};
ImageGallery.defaultProps = {
    displayOptions: 'grid',
};

export default ImageGallery;
