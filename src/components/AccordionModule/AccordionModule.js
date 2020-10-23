
import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';

import AccordionItem from './AccordionItem';

import './AccordionModule.scss';

const AccordionModule = ({ content }) => (
    <div className="c-accordion">
        <Accordion>
            {content && content.map((item, index) => (
                <AccordionItem
                    image={item.getImage()}
                    index={index}
                    name={item.getName()}
                    text={item.getText()}
                />
            ))}
        </Accordion>
    </div>
);

AccordionModule.propTypes = {
    content: PropTypes.arrayOf.isRequired
};

export default AccordionModule;
