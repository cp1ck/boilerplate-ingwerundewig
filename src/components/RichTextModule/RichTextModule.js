/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES } from '@contentful/rich-text-types';
import Truncate from 'react-truncate';

import './RichTextModule.scss';


const renderNode = (node, isButton, goTo) => {
    const {
        content,
        data: {
            target,
            uri
        },
    } = node;
    let href = '';
    let linkText = content ? content[0].value : '';
    let childModules = null;

    if (target) {
        const {
            modules,
            path,
            title,
        } = target.fields;

        linkText = linkText || title;
        href = path || title;
        childModules = modules;
    } else {
        linkText = content[0].value;
        href = uri;
    }

    const handleClick = (event) => {
        const isIntern = href.includes(window.location.origin);
        if (isIntern) {
            event.preventDefault();
            const internPath = href.replace(window.location.origin, '');
            goTo(internPath);
        }
        return null;
    };

    return (
        <a href={href} onClick={e => handleClick(e)}>{linkText}</a>
    );
};

const RichTextModule = ({
    className,
    goTo,
    isButton,
    text,
    truncate,
}) => {
    const rteClassNames = classNames(
        'c-rte',
        className,
    );

    const options = {
        renderNode: {
            [INLINES.HYPERLINK]: node => renderNode(node, isButton, goTo),
            [INLINES.ENTRY_HYPERLINK]: node => renderNode(node, isButton, goTo),
        }
    };
    if (text && text.data) {
        try {
            const doc = documentToReactComponents(text, options);
            if (doc) {
                if (truncate) {
                    return (
                        <Truncate
                            className={rteClassNames}
                            lines={3}
                            ellipsis={<>&hellip;</>}
                        >
                            {doc}
                        </Truncate>
                    );
                }
                return (<div className={rteClassNames}>{doc}</div>);
            }
        } catch (error) {
            console.error('UUUUUnnnndd', error);
        }
    }

    return (
        <div className={rteClassNames}>{}</div>
    );
};

RichTextModule.propTypes = {
    className: PropTypes.string,
    goTo: PropTypes.func.isRequired,
    isButton: PropTypes.bool,
    text: PropTypes.object.isRequired,
    truncate: PropTypes.bool,
};

RichTextModule.defaultProps = {
    className: '',
    isButton: false,
    truncate: false,
};

export default RichTextModule;
