
import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import AuthenticationService from '../../services/AuthenticationService';

import './Login.scss';

const {
    REACT_APP_AUTH_SERVICE_ENDPOINT
} = process.env;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthenticationService(REACT_APP_AUTH_SERVICE_ENDPOINT);
        this.state = {
            email: '',
            emailReset: '',
            password: '',
            confirmationCode: '',
            showResetPasswordDialog: false,
            codeSent: false,
            confirmedReset: false
        };
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {
            email,
            password
        } = this.state;
        const response = await this.authService.login(email, password);
        if (!response) {
            console.error('No response from Authentication Service');
        } else if (response.token) {
            console.log('Login successful');
            window.location = '/';
        } else {
            console.log('Invalid email or password');
        }
    }

    onValueChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    async requestResetPassword(emailReset) {
        const response = await this.authService.requestResetPassword(emailReset);
        if (response.error) {
            return;
        }
        this.setState({
            codeSent: true
        });
    }


    async confirmResetPassword(confirmationCode, confirmedPassword, emailReset, newPassword) {
        if (newPassword !== confirmedPassword) return;
        const response = await this.authService.confirmResetPassword(
            confirmationCode,
            emailReset,
            newPassword
        );
        if (response.error) {
            return;
        }
        this.setState({
            confirmedReset: true
        });
        this.showResetPasswordDialog(false);
    }


    showResetPasswordDialog = (value) => {
        this.setState({
            showResetPasswordDialog: value
        });
        if (value === false) {
            this.setState({
                codeSent: false,
                confirmationCode: '',
                confirmedReset: false,
                emailReset: '',
                newPassword: ''
            });
        }
    }

    renderRequestCodeForm() {
        const { showResetPasswordDialog, emailReset } = this.state;
        return (
            <Modal
                show={showResetPasswordDialog}
                onHide={() => this.showResetPasswordDialog(false)}
                className="c-login__modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Passwort zurücksetzen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                name="emailReset"
                                placeholder="E-Mail eingeben"
                                onChange={event => this.onValueChange(event)}
                                value={emailReset}
                                className="c-form-control"
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.showResetPasswordDialog(false)}>
                                Abbrechen
                    </Button>
                    <Button variant="primary" onClick={() => this.requestResetPassword(emailReset)}>
                                Verifizierungscode anfordern
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    renderConfirmationForm() {
        const {
            confirmationCode,
            confirmedPassword,
            emailReset,
            newPassword,
            showResetPasswordDialog,
        } = this.state;
        return (
            <Modal
                show={showResetPasswordDialog}
                onHide={() => this.showResetPasswordDialog(false)}
                className="c-login__modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Passwort zurücksetzen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="confirmationCode"
                                placeholder="Verifikationscode aus E-Mail eingeben"
                                onChange={event => this.onValueChange(event)}
                                value={confirmationCode}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                placeholder="Neues Passwort eingeben"
                                onChange={event => this.onValueChange(event)}
                                value={newPassword}
                                className="c-form-control"
                            />
                        </Form.Group>
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
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.showResetPasswordDialog(false)}>
                                Abbrechen
                    </Button>
                    <Button variant="primary" onClick={() => this.confirmResetPassword(confirmationCode, confirmedPassword, emailReset, newPassword)}>
                                Passwort ändern
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const {
            codeSent,
            confirmedReset,
            email,
            password,
        } = this.state;

        return (
            <div className="c-login">
                <div className="c-login__form">
                    <Form onSubmit={event => this.handleSubmit(event)}>
                        <h2 className="c-login__headline">Login</h2>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="E-Mail eingeben"
                                onChange={event => this.onValueChange(event)}
                                value={email}
                                className="c-form-control"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Passwort eingeben"
                                onChange={event => this.onValueChange(event)}
                                value={password}
                                className="c-form-control"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="c-login__btn-login">
                             Login
                        </Button>
                    </Form>
                    <Button
                        className="c-login__btn-password"
                        variant="secondary"
                        onClick={() => this.showResetPasswordDialog(true)}
                    >
                             Passwort vergessen
                    </Button>
                    {!codeSent
                        ? this.renderRequestCodeForm()
                        : !confirmedReset
                        && this.renderConfirmationForm()
                    }
                </div>
            </div>
        );
    }
}
