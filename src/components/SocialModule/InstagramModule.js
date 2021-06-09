/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import {
    Carousel,
    Spinner
} from 'react-bootstrap';

import './InstagramModule.scss';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};


class InstagramModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instagramFeed: []
        };
    }

    async componentDidMount() {
        const { fetchInstagramFeed } = this.props;
        const instagramFeed = await fetchInstagramFeed();
        if (instagramFeed) {
            this.setState({
                instagramFeed
            });
        }
    }

    render() {
        const { instagramFeed } = this.state;

        return (
            <div className="c-instagram">
                {instagramFeed.length <= 0 ? (
                    <Spinner />
                ) : (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="c-instagram__grid"
                            columnClassName="c-instagram__grid-column"
                        >
                            {instagramFeed.map(items => (
                                <Carousel
                                    controls={false}
                                    indicators={false}
                                    interval={Math.floor(Math.random() * 3000) + 4000}
                                >
                                    {items.map(item => (
                                        !item.isVideo && (
                                            <Carousel.Item>
                                                <a
                                                    href={item.permalink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    tabIndex="0"
                                                >
                                                    <img
                                                        src={item.src}
                                                        alt=""
                                                    />
                                                </a>
                                            </Carousel.Item>
                                        )

                                    ))}
                                </Carousel>
                            ))}
                        </Masonry>
                    )
                }
            </div>
        );
    }
}

InstagramModule.propTypes = {
    fetchInstagramFeed: PropTypes.func.isRequired,
};

export default InstagramModule;
