/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';

import NavigationMapping from './NavigationMapping';
import Image from '../Image/Image';
import SocialIcons from '../SocialModule/SocialIcons';

import './HeaderMobile2.scss';

class HeaderMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: false
        };
    }

    render() {
        const {
            brandName,
            logo,
            onCategoryChange,
            navigation,
            socials
        } = this.props;
        const pathname = window.location.pathname.replace('/', '');
        const activeKey = pathname ? navigation.findIndex(item => item.path === pathname) : 0;
        const {
            showNav
        } = this.state;

        return (
            (
                <div className="c-header-mobile fixed-top">
                    <div className="c-header-mobile__navbar">
                        <Container>
                            <Navbar>
                                <Navbar.Brand href={navigation ? navigation[0].path : ''}>
                                    {logo && (
                                        <Image
                                            className="c-header-mobile__brand-logo"
                                            alt={logo.getAlt()}
                                            imageHeight={logo.getHeight()}
                                            imageWidth={logo.getWidth()}
                                            src={logo.getImageUrl()}
                                        />
                                    )}
                                    {brandName && (
                                        <div className="c-header-mobile__brand-name">{brandName}</div>
                                    )}
                                </Navbar.Brand>
                                {navigation && (
                                    <>
                                        {navigation.length > 0 && (
                                            <Nav className="c-header-mobile__navigation ml-auto" activeKey={activeKey}>
                                                <svg
                                                    className={!showNav ? 'ham hamRotate' : 'ham hamRotate active'}
                                                    viewBox="0 0 100 100"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.setState({
                                                            showNav: !showNav
                                                        });
                                                    }}
                                                >
                                                    <path className="line top" d="m 30 33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
                                                    <path className="line middle" d="m 30 50 h 40" />
                                                    <path className="line bottom" d="m 70 67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
                                                </svg>
                                            </Nav>
                                        )}
                                    </>
                                )}
                            </Navbar>
                        </Container>
                    </div>

                    <div
                        className={showNav ? 'c-header-mobile__navbar-overlay open' : 'c-header-mobile__navbar-overlay'}
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                showNav: !showNav
                            });
                        }}
                    >
                        <NavigationMapping
                            navigation={navigation}
                            onCategoryChange={onCategoryChange}
                        />
                        {socials && (
                            <SocialIcons className="c-header-mobile__socials" socials={socials} />
                        )}
                    </div>
                </div>
            )
        );
    }
}

HeaderMobile.propTypes = {
    brandName: PropTypes.string,
    logo: PropTypes.shape().isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    navigation: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        path: PropTypes.string
    })).isRequired,
    socials: PropTypes.shape({
        socials: PropTypes.shape({
            facebook: PropTypes.string,
            instagram: PropTypes.string,
            linkedIn: PropTypes.string,
            twitter: PropTypes.string,
            xing: PropTypes.string,
        })
    }),
};

HeaderMobile.defaultProps = {
    brandName: null,
    socials: {},
};

export default HeaderMobile;
