import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import AuthenticationService from '../../services/AuthenticationService';

import './AuthHeader.scss';

const {
    REACT_APP_AUTH_SERVICE_ENDPOINT
} = process.env;
const authService = new AuthenticationService(REACT_APP_AUTH_SERVICE_ENDPOINT);

const handleLogout = async (token) => {
    await authService.logout(token);
    window.location = '/';
};

const AuthHeader = () => {
    const token = localStorage.getItem('userToken');
    return (
        <div className="c-header">
            <Container>
                <Navbar collapseOnSelect expand="sm" className="c-auth-header">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="c-header__navigation ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {token ? (
                                <>
                                    <Nav.Link href="user">Accountübersicht</Nav.Link>
                                    <Nav.Link onClick={() => handleLogout(token)}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="login">Login</Nav.Link>
                                    <Nav.Link href="register">Registrieren</Nav.Link>
                                </>
                            )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>

    );
};

export default AuthHeader;
