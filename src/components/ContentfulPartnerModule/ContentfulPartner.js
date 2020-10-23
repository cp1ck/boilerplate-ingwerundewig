import React from 'react';
import PropTypes from 'prop-types';

import './ContentfulPartner.scss';

const ContentfulPartner = ({ className, logoType }) => (
    <div className={`c-contentful-partner ${className}`}>
        <a className="c-contentful-partner__logo" href="https://www.contentful.com/" target="_blank" rel="nofollow noopener noreferrer">
            {logoType === 'light' && (
                <img src="https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg" alt="Powered by Contentful" />
            )}
            {logoType === 'dark' && (
                <img src="https://images.ctfassets.net/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg" alt="Powered by Contentful" />
            )}
            {logoType === 'mono' && (
                <img src="https://images.ctfassets.net/fo9twyrwpveg/7Htleo27dKYua8gio8UEUy/0797152a2d2f8e41db49ecbf1ccffdaa/PoweredByContentful_DarkBackground_MonochromeLogo.svg" alt="Powered by Contentful" />
            )}
        </a>
    </div>
);

ContentfulPartner.propTypes = {
    className: PropTypes.string,
    logoType: PropTypes.string,
};

ContentfulPartner.defaultProps = {
    className: '',
    logoType: 'light',
};

export default ContentfulPartner;
