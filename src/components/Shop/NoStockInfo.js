import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Form,
    FormControl,
    FormGroup,
    Row,
} from 'react-bootstrap';

import './NoStockInfo.scss';
import '../Button/Button.scss';

const NoStock = ({ contactService }) => {
    const [email, setEmail] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("SUBMIT");

    }

    const checkMail = () => {
        const regexMail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        const isValid = email && regexMail.test(email);
        return isValid;
    }

    const isMailValid = checkMail();

    return (
        <div className="c-no-stock-info">
            <h2>Sold out</h2>
            <Row>
                <Col md={6}>
                    Zur Zeit ist unser Schnapslager ausverkauft. Aber trag doch einfach deine Email hier ein und wir benachrichtigen dich umgehend wenn wir wieder gebraut haben!
                </Col>
                <Col md={6}>
                    <Form>
                        <FormGroup>
                            <FormControl
                                name="email"
                                type="email"
                                onChange={e => handleInputChange(e)}
                                placeholder="Deine E-Mail"
                                value={email}
                                className="c-no-stock-info__form-control"
                                isInvalid={email && !isMailValid}
                            />
                        </FormGroup>
                        <button
                            className="c-button c-button-light c-no-stock-info__form-submit"
                            disabled={!isMailValid}
                            onClick={e => handleSubmit(e)}
                            type="submit"
                        >
                            Informiert werden
                        </button>

                    </Form>
                </Col>
            </Row>
        </div>
    );

};

export default NoStock;