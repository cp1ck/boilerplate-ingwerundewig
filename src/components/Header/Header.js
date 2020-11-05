import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

const HeaderDesktop = lazy(() => import('./HeaderDesktop1'));
const HeaderMobile = lazy(() => import('./HeaderMobile2'));


const Header = ({
    brandName,
    logo,
    onCategoryChange,
    navigation,
    socials
}) => (
    isMobile ? (
        <HeaderMobile
            brandName={brandName}
            logo={logo}
            onCategoryChange={onCategoryChange}
            navigation={navigation}
            socials={socials}
        />
    ) : (
        <HeaderDesktop
            brandName={brandName}
            logo={logo}
            onCategoryChange={onCategoryChange}
            navigation={navigation}
            socials={socials}
        />
    )
);

Header.propTypes = {
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

Header.defaultProps = {
    brandName: null,
    socials: {},
};

export default Header;
