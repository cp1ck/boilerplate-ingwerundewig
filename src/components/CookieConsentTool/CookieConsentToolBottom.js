import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CookieConsent from 'react-cookie-consent';

import {
    applyCookieRules,
    setCookies,
} from '../../helpers/cookieHelpers';

import './CookieConsentTool.scss';

const CookieConsentTool = ({
    buttonText,
    linkText,
    linkUrl,
    text,
    theme
}) => {
    const [statistic, setStatistic] = useState(true);
    const [marketing, setMarketing] = useState(true);
    useEffect(() => applyCookieRules(), []);

    return (
        <CookieConsent
            buttonClasses="c-cookie__btn"
            buttonText={buttonText}
            buttonWrapperClasses="col-12 col-sm-4 col-md-2"
            containerClasses={`c-cookie c-cookie-${theme}`}
            contentClasses="c-cookie__content col-12 col-sm-8 col-md-10"
            cookieName="boilerplateCookie"
            expires={150}
            location="bottom"
            disableStyles
            onAccept={() => setCookies({ statistic, marketing })}
        >
            <span>
                {text}
            </span>
            {linkText && linkUrl && (
                <a className="c-cookie__link" href={linkUrl} target="_blank" rel="noopener noreferrer">{linkText}</a>
            )}
            <div className="c-cookie__wrapper">
                <label className="c-cookie__necessary" htmlFor="necessary">
                    <input
                        className="c-cookie__checkbox"
                        type="checkbox"
                        id="necessary"
                        checked
                        disabled
                    />
                    Notwendig
                </label>
                <label className="c-cookie__statistic" htmlFor="statistic">
                    <input
                        className="c-cookie__checkbox"
                        type="checkbox"
                        id="statistic"
                        checked={statistic}
                        onChange={() => setStatistic(!statistic)}
                    />
                    Statisik
                </label>
                <label className="c-cookie__marketing" htmlFor="marketing">
                    <input
                        className="c-cookie__checkbox"
                        type="checkbox"
                        id="marketing"
                        checked={marketing}
                        onChange={() => setMarketing(!marketing)}
                    />
                    Marketing
                </label>
            </div>
        </CookieConsent>
    );
};

CookieConsentTool.propTypes = {
    buttonText: PropTypes.string,
    linkText: PropTypes.string,
    linkUrl: PropTypes.string,
    text: PropTypes.string,
    theme: PropTypes.string,
};

CookieConsentTool.defaultProps = {
    buttonText: 'Alles klar',
    linkText: '',
    linkUrl: '',
    text: 'Diese Website nutzt Cookies um die Nutzerfahrung zu verbessern.',
    theme: 'light',
};

export default CookieConsentTool;
