
import React, { Component } from 'react';
import {
    Button, Row, Col, Form
} from 'react-bootstrap';

import ReCAPTCHA from 'react-google-recaptcha';
import AuthenticationService from '../../services/AuthenticationService';

import './Register.scss';

const {
    REACT_APP_AUTH_SERVICE_ENDPOINT
} = process.env;

const RECAPTCHA_KEY = '6LeDyNEZAAAAAOlFO4Gzvg8XIbIgefbSiHY63MyQ';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthenticationService(REACT_APP_AUTH_SERVICE_ENDPOINT);
        this.state = {
            email: '',
            firstName: '',
            hasReCaptcha: false,
            lastName: '',
            password: '',
        };
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {
            confirmedPassword,
            email,
            firstName,
            hasReCaptcha,
            lastName,
            password,
        } = this.state;
        if (hasReCaptcha && password === confirmedPassword) {
            await this.authService.register(email, firstName, lastName, password);
        }
    }

    onValueChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    recaptchaChange(hasReCaptcha) {
        this.setState({
            hasReCaptcha
        });
    }

    render() {
        const {
            confirmedPassword,
            email,
            firstName,
            lastName,
            password,
        } = this.state;

        return (
            <div className="c-register">
                <div className="c-register__form">
                    <Form onSubmit={event => this.handleSubmit(event)}>
                        <h2 className="c-register__headline">Registrierung</h2>
                        <Form>
                            <Row>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            placeholder="Vorname"
                                            onChange={event => this.onValueChange(event)}
                                            value={firstName}
                                            className="c-form-control"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder="Nachname"
                                            onChange={event => this.onValueChange(event)}
                                            value={lastName}
                                            className="c-form-control"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="E-Mail"
                                            onChange={event => this.onValueChange(event)}
                                            value={email}
                                            className="c-form-control"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Passwort"
                                            onChange={event => this.onValueChange(event)}
                                            value={password}
                                            className="c-form-control"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Control
                                            type="password"
                                            name="confirmedPassword"
                                            placeholder="Passwort bestätigen"
                                            onChange={event => this.onValueChange(event)}
                                            value={confirmedPassword}
                                            className="c-form-control"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ReCAPTCHA
                                        className="c-register__recaptcha"
                                        sitekey={RECAPTCHA_KEY}
                                        onChange={e => this.recaptchaChange(!!e)}
                                        onErrored={() => this.recaptchaChange(false)}
                                        onExpired={() => this.recaptchaChange(false)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Button variant="primary" type="submit">
                            Registrieren
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Form>
                </div>
            </div>
        );
    }
}
