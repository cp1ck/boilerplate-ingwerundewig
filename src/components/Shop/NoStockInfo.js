import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Form,
    FormControl,
    FormGroup,
    Row,
} from 'react-bootstrap';

import '../Button/Button.scss';
import './NoStockInfo.scss';

const NoStock = ({ contactService }) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [subscribedError, setSubscribedError] = useState(false);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await contactService.subscribe(email);
        if (!response) {
            setSubscribedError(true);
        } else {
            setSubscribed(true);
            setEmail('');
        }
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
                    < Form >
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
                    <div className="c-no-stock-info-feedback">
                        {subscribed &&
                            <div className="c-no-stock-info-feedback__success"> Wir melden uns wenn es Nachschub gibt!</div>
                        }
                        {subscribedError && (
                            <div className="c-no-stock-info-feedback__error">
                                Hoppla, da ist beim Senden etwas schiefgelaufen. Bitte versuche es erneut oder schreib uns an
                                <a href="mailto: contact@ingwerundewig.de">contact@ingwerundewig.de</a>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div >
    );

};

export default NoStock;