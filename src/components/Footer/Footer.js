/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';


import ContentfulPartner from '../ContentfulPartnerModule/ContentfulPartner';
import Media from '../Media/Media';
import SocialIcons from '../SocialModule/SocialIcons';


import './Footer.scss';


const Footer = ({
    goTo,
    logo,
    menu,
    name,
    socials,
}) => (
    <footer className="c-footer" id="footer">
        <Container>
            <Row>
                {logo && (
                    <Col xs="auto">
                        <Media className="c-footer__brand-logo" media={logo} />
                    </Col>
                )}
                <Col xs="auto">
                    <div className="c-footer__details">
                        {name && (
                            <h3 className="c-footer__brand-name">{name}</h3>
                        )}
                        {menu && (
                            <ul className="c-footer__sitemap">
                                {menu.map(item => (
                                    <li key={item.getId()}>
                                        <a
                                            onClick={(event) => {
                                                event.preventDefault();
                                                goTo(item.getPath());
                                            }}
                                            href={`/${item.getPath()}`}
                                        >
                                            {item.getTitle()}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <a href="mailto: contact@ingwerundewig.de">contact@ingwerundewig.de</a>
                        <br />
                        {socials && (
                            <SocialIcons className="c-footer__socials" socials={socials} />
                        )}
                    </div>
                </Col>
                <Col>
                    <ContentfulPartner className="c-footer__contentful-partner" logoType="mono" />
                </Col>
            </Row>
        </Container>
    </footer>
);

Footer.propTypes = {
    goTo: PropTypes.func.isRequired,
    logo: PropTypes.shape(),
    menu: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        path: PropTypes.string
    })),
    name: PropTypes.string,
    socials: PropTypes.shape({
        facebook: PropTypes.string,
        instagram: PropTypes.string,
        linkedIn: PropTypes.string,
        twitter: PropTypes.string,
        xing: PropTypes.string,
    }),
};

Footer.defaultProps = {
    name: '',
    logo: {},
    menu: {},
    socials: {},
};

export default Footer;
