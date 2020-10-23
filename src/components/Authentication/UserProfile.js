
import React, { Component } from 'react';
import {
    Button, Col, Form, Row, Container, Modal
} from 'react-bootstrap';

import AuthenticationService from '../../services/AuthenticationService';

import './UserProfile.scss';

const {
    REACT_APP_AUTH_SERVICE_ENDPOINT
} = process.env;

export default class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthenticationService(REACT_APP_AUTH_SERVICE_ENDPOINT);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            showPasswordDialog: false
        };
    }

    async componentDidMount() {
        const { firstName, lastName, email } = await this.authService.getMe();
        this.setState({
            email,
            firstName,
            lastName
        });
    }

    showPasswordDialog = (value) => {
        this.setState({
            showPasswordDialog: value
        });
    }

    changePassword = async () => {
        const { password, confirmedPassword, previousPassword } = this.state;
        if (password === confirmedPassword) {
            await this.authService.changePassword(previousPassword, password);
        }
    }

    onValueChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const {
            confirmedPassword,
            email,
            firstName,
            lastName,
            password,
            previousPassword,
            showPasswordDialog
        } = this.state;

        return (
            <div className="c-user-details">
                <Container>
                    <h2>Accountübersicht</h2>
                    <Row>
                        <Col md="3">
                            <div>Vorname:</div>
                            <div>Nachname:</div>
                            <div>Email:</div>
                        </Col>
                        <Col md="9">
                            <div>{firstName}</div>
                            <div>{lastName}</div>
                            <div>{email}</div>
                        </Col>
                        <Button
                            className="c-user-details__change-password"
                            onClick={() => this.showPasswordDialog(true)}
                        >
                            Passwort ändern
                        </Button>
                    </Row>

                    <Modal
                        className="c-user-details__modal"
                        show={showPasswordDialog}
                        onHide={() => this.showPasswordDialog(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Passwort ändern</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        name="previousPassword"
                                        placeholder="Altes Passwort eingeben"
                                        onChange={event => this.onValueChange(event)}
                                        value={previousPassword}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Neues Passwort eingeben"
                                        onChange={event => this.onValueChange(event)}
                                        value={password}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        name="confirmedPassword"
                                        placeholder="Neues Passwort bestätigen"
                                        onChange={event => this.onValueChange(event)}
                                        value={confirmedPassword}
                                    />
                                </Form.Group>
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.showPasswordDialog(false)}>
                                Abbrechen
                            </Button>
                            <Button variant="primary" onClick={this.changePassword}>
                                Speichern
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        );
    }
}
