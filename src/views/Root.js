/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Fragment, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';

import Cache from '../repositories/Cache';
import ContentfulPageRepository from '../repositories/ContentfulPageRepository';
import SocialMediaService from '../services/SocialMediaService';

import PageLoader from '../components/LoaderModule/PageLoader';
import PageNotFound from '../components/PageNotFound/PageNotFound';

import { trackPage } from '../helpers/cookieHelpers';

import '../App.scss';
import Shop from '../components/Shop/Shop';

const AccordionModule = lazy(() => import('../components/AccordionModule/AccordionModule'));
const BadgesModule = lazy(() => import('../components/BadgesModule/BadgesModule'));
const Cover = lazy(() => import('../components/Cover/Cover'));
const Footer = lazy(() => import('../components/Footer/Footer'));
const Header = lazy(() => import('../components/Header/Header'));
const Button = lazy(() => import('../components/Button/Button'));
const ContactModule = lazy(() => import('../components/ContactModule/ContactModule'));
const CookieConsentTool = lazy(() => import('../components/CookieConsentTool/CookieConsentToolBottom'));
const ImageGallery = lazy(() => import('../components/Gallery/ImageGallery'));
const InstagramModule = lazy(() => import('../components/SocialModule/InstagramModule'));
const PopUpStoreModule = lazy(() => import('../components/PopUpStoreModule/PopUpStoreModule'));
const QuoteModule = lazy(() => import('../components/QuoteModule/QuoteModule'));
const RichTextModule = lazy(() => import('../components/RichTextModule/RichTextModule'));
const TwoColumnsModule = lazy(() => import('../components/ColumnsContent/TwoColumnsModule'));
const ThreeColumnsModule = lazy(() => import('../components/ColumnsContent/ThreeColumnsModule'));
const FourColumnsModule = lazy(() => import('../components/ColumnsContent/FourColumnsModule'));
const ScriptModule = lazy(() => import('../components/ScriptModule/ScriptModule'));
const TeamModule = lazy(() => import('../components/TeamModule/TeamModule'));
const TeaserModule = lazy(() => import('../components/TeaserModule/TeaserModule'));
const TableModule = lazy(() => import('../components/TableModule/TableModule'));

const {
    REACT_APP_STAGE,
    REACT_APP_CONTENTFUL_API_KEY,
    REACT_APP_CONTENTFUL_SPACE_ID,
} = process.env;

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            footer: null,
            header: null,
            metadata: null,
            modules: null,
        };
        const cache = new Cache();
        this.socialMediaService = new SocialMediaService();
        this.repository = new ContentfulPageRepository(cache, {
            space: REACT_APP_CONTENTFUL_SPACE_ID,
            accessToken: REACT_APP_CONTENTFUL_API_KEY,
            preview: REACT_APP_STAGE === 'PREVIEW',
        });
    }

    // eslint-disable-next-line camelcase
    async UNSAFE_componentWillReceiveProps() {
        const { history } = this.props;
        if (history && history.action === 'POP') {
            this.fetchContent();
        }
    }

    async componentDidMount() {
        const cookieConsent = await this.repository.getCookieConsent();
        const header = await this.repository.getHeader();
        const footer = await this.repository.getFooter();
        this.setState({
            cookieConsent,
            header,
            footer,
        });
        this.fetchContent();
    }

    async fetchContent() {
        const {
            location: {
                pathname
            }
        } = window;
        const path = pathname.substr(1);
        let content = null;
        // Nur solange wir kein Extension dafür haben
        // if (path === 'shop') {
        //     content = [{ id: 0, className: 'PopUpStore' }];
        // } else {
        content = await this.repository.getContent(path);
        // }

        const {
            header,
        } = this.state;

        const fallbackPath = (!path && header && header.menu && header.menu[0]) ? header.menu[0].fields.path : '';
        const metadata = await this.repository.getMetadata(path || fallbackPath);
        this.setState({
            metadata
        });

        if (!content) {
            content = [{ id: 0, className: '404' }];
        }

        this.renderModules(content);
        window.scrollTo(0, 0);
    }

    renderModules(content) {
        const modules = [];

        for (let i = 0; i < content.length; i += 1) {
            const item = content[i];
            const theme = item && item.theme ? `c-module-${item.getTheme()}` : '';
            const module = this.getModule(item);
            modules.push(
                <Suspense key={item.id ? item.getId() : 0} fallback={<PageLoader />}>
                    <div className={`c-module ${theme} id${item.id}`}>
                        {item.className === 'CoverModule'
                            ? module
                            : (
                                <Container>
                                    {module}
                                </Container>
                            )
                        }
                    </div>
                </Suspense>
            );

            this.setState({
                modules,
            });
        }
    }


    fillMetadata(metadata) {
        if (metadata) {
            const image = metadata.getImage();
            return (
                <Helmet>
                    <title>{metadata.getTitle()}</title>
                    <link rel="canonical" href={window.location.origin} />
                    <meta id="og-site_name" property="og:site_name" content={window.location.origin} />
                    <meta id="og-title" property="og:title" content={metadata.getTitle()} />
                    <meta id="og-url" property="og:url" content={window.location.href} />
                    <meta id="og-description" property="og:description" name="description" content={metadata.getDescription()} />
                    <meta id="og-type" property="og:type" content="website" />
                    <meta id="og-image" property="og:image" content={image.getImageUrl()} />
                    <meta id="og-image-alt" property="og:image:alt" content={image.getAlt()} />
                    <meta id="og-image-width" property="og:image:width" content={image.width} />
                    <meta id="og-image-height" property="og:image:height" content={image.height} />
                    <meta id="og-locale" property="og:locale" content="de_DE" />
                </Helmet>
            );
        }
        return null;
    }

    async fetchInstagramFeed(username) {
        return this.socialMediaService.fetchInstagramFeed(username);
    }

    goTo(path) {
        const { history } = this.props;
        history.push(path);
        trackPage(path);
        this.fetchContent();
        window.scrollTo(0, 0);
    }

    getModule(item, columnModules = false) {
        if (!item) {
            return <div />;
        }
        return this.getComponents(item, columnModules);
    }

    getComponents(item, columnModules) {
        switch (item.className) {
            default:
                return null;
            case '404':
                return (<PageNotFound />);
            case 'AccordionModule':
                return (
                    <AccordionModule
                        className={columnModules ? 'no-spacing' : ''}
                        content={item.getContent()}
                        key={item.getId()}
                    />
                );
            case 'BadgesModule':
                return (
                    <BadgesModule
                        className={columnModules ? 'no-spacing' : ''}
                        key={item.getId()}
                        logos={item.getLogos()}
                    />
                );
            case 'ButtonModule':
                return (
                    <Button
                        className={columnModules ? 'no-spacing' : ''}
                        goTo={path => this.goTo(path)}
                        isExternal={item.getIsExternal()}
                        key={item.getId()}
                        text={item.getText()}
                        theme={item.getTheme()}
                        url={item.getUrl()}
                    />
                );
            case 'ContactModule':
                return (
                    <ContactModule
                        className={columnModules ? 'no-spacing' : ''}
                        emailRecipient={item.getEmailRecipient()}
                        key={item.getId()}
                        text="Hier kannst du Kontakt mit uns aufnehmen."
                        title="Kontakt"
                        theme={item.getTheme()}
                    />
                );
            case 'CoverModule':
                return (
                    <Cover
                        button={item.getButton()}
                        className={columnModules ? 'no-spacing' : ''}
                        goTo={path => this.goTo(path)}
                        headline={item.getHeadline()}
                        key={item.getId()}
                        media={item.getMedia()}
                        subheadline={item.getSubheadline()}
                        subline={item.getSubline()}
                    />
                );
            case 'InstagramModule':
                return (
                    <InstagramModule
                        className={columnModules ? 'no-spacing' : ''}
                        fetchInstagramFeed={() => this.fetchInstagramFeed(item.getUsername())}
                        key={item.getId()}
                    />
                );
            case 'PopUpStore':
                return (<PopUpStoreModule />);
            case 'QuoteModule':
                return (
                    <QuoteModule
                        authorName={item.getAuthorName()}
                        authorOccupation={item.getAuthorOccupation()}
                        className={columnModules ? 'no-spacing' : ''}
                        text={item.getText()}
                    />
                );
            case 'MediaModule':
                return (
                    <ImageGallery
                        className={columnModules ? 'no-spacing' : ''}
                        displayOptions={item.getDisplayOptions()}
                        key={item.getId()}
                        media={item.getMedia()}
                    />
                );
            case 'TextModule':
                return (
                    <RichTextModule
                        className={columnModules ? 'no-spacing' : ''}
                        goTo={path => this.goTo(path)}
                        key={item.getId()}
                        text={item.getText()}
                    />
                );
            case 'TwoColumnsModule':
                return (
                    <TwoColumnsModule
                        className={columnModules ? 'no-spacing' : ''}
                        key={item.getId()}
                        left={item.getLeftColumn() ? item.getLeftColumn().map(entry => this.getModule(entry, true)) : null}
                        right={item.getRightColumn() ? item.getRightColumn().map(entry => this.getModule(entry, true)) : null}
                        sizes={item.getColumnsSize()}
                    />
                );
            case 'ThreeColumnsModule':
                return (
                    <ThreeColumnsModule
                        className={columnModules ? 'no-spacing' : ''}
                        key={item.getId()}
                        left={item.getLeftColumn() ? item.getLeftColumn().map(entry => this.getModule(entry, true)) : null}
                        center={item.getCenterColumn() ? item.getCenterColumn().map(entry => this.getModule(entry, true)) : null}
                        right={item.getRightColumn() ? item.getRightColumn().map(entry => this.getModule(entry, true)) : null}
                        sizes={item.getColumnsSize()}
                    />
                );
            case 'FourColumnsModule':
                return (
                    <FourColumnsModule
                        className={columnModules ? 'no-spacing' : ''}
                        key={item.getId()}
                        left={item.getLeftColumn() ? item.getLeftColumn().map(entry => this.getModule(entry, true)) : null}
                        centerLeft={item.getLeftCenterColumn() ? item.getLeftCenterColumn().map(entry => this.getModule(entry, true)) : null}
                        centerRight={item.getRightCenterColumn() ? item.getRightCenterColumn().map(entry => this.getModule(entry, true)) : null}
                        right={item.getRightColumn() ? item.getRightColumn().map(entry => this.getModule(entry, true)) : null}
                        sizes={item.getColumnsSize()}
                    />
                );
            case 'Shop':
                return (
                    <Shop
                        isInStock={item.getIsInStock()}
                        products={item.getProducts()}
                    />
                );
            case 'ScriptModule':
                return (
                    <ScriptModule
                        className={columnModules ? 'no-spacing' : ''}
                        key={item.getId()}
                        script={item.getScript()}
                    />
                );
            case 'Team':
                return (
                    <TeamModule
                        className={columnModules ? 'no-spacing' : ''}
                        key={item.getId()}
                        members={item.getMembers()}
                    />
                );
            case 'TeaserModule':
                return (
                    <TeaserModule
                        className={columnModules ? 'no-spacing' : ''}
                        description={item.getDescription()}
                        goTo={() => this.goTo(item.getPath())}
                        image={item.getImage()}
                        key={item.getId()}
                        title={item.getTitle()}
                    />
                );
            case 'TableModule':
                return (
                    <TableModule
                        key={item.getId()}
                        text={item.getText()}
                    />
                );
        }
    }

    render() {
        const {
            cookieConsent,
            header,
            footer,
            metadata,
            modules,
        } = this.state;

        const md = this.fillMetadata(metadata);

        return (
            <Fragment>
                {md && md}
                {header && (
                    <Header
                        brandName={header.getBrandName()}
                        logo={header.getLogo()}
                        onCategoryChange={path => this.goTo(path)}
                        navigation={header.getNavigation()}
                        socials={header.getSocials()}
                    />
                )}
                {cookieConsent ? (
                    <CookieConsentTool
                        buttonText={cookieConsent.getButtonText()}
                        key={cookieConsent.getId()}
                        linkText={cookieConsent.getLinkText()}
                        linkUrl={cookieConsent.getLinkUrl()}
                        text={cookieConsent.getText()}
                        theme={cookieConsent.getTheme()}
                    />
                ) : (
                        <CookieConsentTool />
                    )}
                {modules && modules.map(m => m)}
                {footer && (
                    <Footer
                        goTo={path => this.goTo(path)}
                        logo={footer.getLogo()}
                        menu={footer.getNavigation()}
                        name={footer.getName()}
                        socials={footer.getSocials()}
                    />
                )}
            </Fragment>
        );
    }
}

export default Root;
