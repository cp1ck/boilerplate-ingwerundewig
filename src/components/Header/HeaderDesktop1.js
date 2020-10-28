/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';

import NavigationMapping from './NavigationMapping';
import Image from '../Image/Image';
import SocialIcons from '../SocialModule/SocialIcons';

import './HeaderDesktop1.scss';

const HeaderDesktop = ({
    brandName,
    logo,
    onCategoryChange,
    navigation,
    socials
}) => {
    const pathname = window.location.pathname.replace('/', '');
    const activeKey = pathname ? navigation.findIndex(item => item.path === pathname) : 0;
    return (
        (
            <div className="c-header fixed-top">
                <div className="c-header__navbar">
                    <Container>
                        <Navbar collapseOnSelect expand="lg" variant="dark">
                            <Navbar.Brand className="c-header__brand" href={navigation ? navigation[0].path : ''}>
                                {logo && (
                                    <Image
                                        className="c-header__brand-logo"
                                        alt={logo.getAlt()}
                                        imageHeight={logo.getHeight()}
                                        imageWidth={logo.getWidth()}
                                        src={logo.getImageUrl()}
                                    />
                                )}
                                {brandName && (
                                    <div className="c-header__brand-name">{brandName}</div>
                                )}
                            </Navbar.Brand>
                            {navigation && (
                                <>
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="c-header__navigation ml-auto" defaultActiveKey={activeKey}>
                                            <NavigationMapping
                                                navigation={navigation}
                                                onCategoryChange={onCategoryChange}
                                            />
                                        </Nav>
                                        {socials && (
                                            <SocialIcons className="c-header__socials" socials={socials} />
                                        )}
                                    </Navbar.Collapse>
                                </>
                            )}
                        </Navbar>
                    </Container>
                </div>
            </div>
        )
    );
};

HeaderDesktop.propTypes = {
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

HeaderDesktop.defaultProps = {
    brandName: null,
    socials: {},
};

export default HeaderDesktop;
