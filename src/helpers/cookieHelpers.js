import TagManager from 'react-gtm-module';
import ReactPixel from 'react-facebook-pixel';

const {
    REACT_APP_GTM_ID,
    REACT_APP_FBP_ID,
} = process.env;

const readCookie = (cookieName) => {
    const cookies = document.cookie;
    if (!cookies.includes(cookieName)) {
        return 'false';
    }
    const regex = new RegExp(`(?:(?:^|.*;\\s*)${cookieName}\\s*=\\s*([^;]*).*$)|^.*$`);
    const cookieValue = cookies.replace(regex, '$1');
    return cookieValue;
};

const applyCookieRules = () => {
    const statisticCookie = readCookie('statistic');
    const marketingCookie = readCookie('marketing');
    if (statisticCookie === 'true' && REACT_APP_GTM_ID) {
        TagManager.initialize({
            gtmId: REACT_APP_GTM_ID
        });
    }
    if (marketingCookie === 'true' && REACT_APP_FBP_ID) {
        ReactPixel.init(REACT_APP_FBP_ID);
    }
};

const trackPage = (path) => {
    const statisticCookie = readCookie('statistic');
    const marketingCookie = readCookie('marketing');
    if (statisticCookie === 'true') {
        const tagManagerArgs = {
            dataLayer: {
                page: path
            },
            dataLayerName: 'PageDataLayer'
        };
        TagManager.dataLayer(tagManagerArgs);
    }
    if (marketingCookie === 'true') {
        ReactPixel.pageView();
    }
};

const setCookies = (cookies) => {
    document.cookie = `statistic=${cookies.statistic}`;
    document.cookie = `marketing=${cookies.marketing}`;
    applyCookieRules();
};

export {
    applyCookieRules,
    setCookies,
    trackPage
};
