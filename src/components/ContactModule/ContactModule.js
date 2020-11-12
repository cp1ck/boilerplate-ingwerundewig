import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    FormControl,
    FormGroup,
    Spinner
} from 'react-bootstrap';

import ContactService from '../../services/ContactService';

import 'react-datepicker/dist/react-datepicker.css';
import './ContactModule.scss';


class ContactModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSent: false,
            // formError: false,
            formLoading: false,
            form: {
                email: '',
                name: '',
                message: '',
            }
        };
        this.contactService = new ContactService();
    }

    handleInputChange(event) {
        const { form } = this.state;
        event.preventDefault();
        const { value, name } = event.target;
        this.setState({
            form: {
                ...form,
                [name]: value
            }
        });
    }

    handleDateChange(date) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                date
            }
        });
    }

    async handleSubmit(event, emailRecipient) {
        const { form } = this.state;

        event.preventDefault();
        this.setState({
            formSent: false,
            formError: false,
            formLoading: true
        });

        if (form.name.trim()
            && form.email.trim()
            && form.email.includes('@')
            && form.message.trim()
        ) {
            try {
                const response = await this.contactService.sendMessage(
                    emailRecipient,
                    form
                );
                if (response) {
                    this.setState({
                        formSent: true,
                        formLoading: false
                    });
                }
            } catch (error) {
                this.setState({
                    formError: true,
                    formSent: false,
                    formLoading: false
                });
            }
        }
    }

    render() {
        const {
            emailRecipient
        } = this.props;

        if (!emailRecipient) {
            return null;
        }

        const {
            formSent, form, formLoading, formError
        } = this.state;

        const formSentFeedback = (
            <div className="c-contact__form-success">
                Deine Nachricht wurde versandt!
            </div>
        );

        const formErrorFeedback = (
            <div className="c-contact__form-error">
                Fehler beim Senden der Nachricht.
            </div>
        );

        const regexMail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

        const isMailValid = regexMail.test(form.email);

        const isValid = isMailValid && form.name && form.message;

        const contactForm = (
            <>
                {formLoading
                    ? (
                        <Spinner animation="border" role="status" variant="light">
                            <span className="sr-only">Wird geladen...</span>
                        </Spinner>
                    )
                    : (
                        <Form className="c-contact__form">
                            <FormGroup className="c-contact__form-group">
                                <FormControl
                                    name="name"
                                    type="text"
                                    onChange={e => this.handleInputChange(e)}
                                    placeholder="Name"
                                    value={form.name}
                                    className="c-contact__form-control"
                                />
                            </FormGroup>
                            <FormGroup className="c-contact__form-group">
                                <FormControl
                                    name="email"
                                    type="email"
                                    onChange={e => this.handleInputChange(e)}
                                    placeholder="E-Mail"
                                    value={form.email}
                                    className="c-contact__form-control"
                                    isInvalid={form.email && !isMailValid}
                                />
                                <Form.Control.Feedback className="c-contact__form-error" type="invalid">
                                    Ungültige Email Adresse
                                </Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup className="c-contact__form-group">
                                <FormControl
                                    name="phone"
                                    type="phone"
                                    onChange={e => this.handleInputChange(e)}
                                    placeholder="Telefonnummer"
                                    value={form.phone}
                                    className="c-contact__form-control"
                                />
                            </FormGroup>
                            <FormGroup className="c-contact__form-group">
                                <FormControl
                                    as="textarea"
                                    name="message"
                                    rows="4"
                                    onChange={e => this.handleInputChange(e)}
                                    placeholder="Deine Nachricht"
                                    value={form.message}
                                    className="c-contact__form-control c-contact__form-textarea"
                                />
                            </FormGroup>
                            <FormGroup className="c-contact__form-group">
                                <button
                                    className="c-button c-button-dark c-contact__form-submit"
                                    disabled={!isValid}
                                    onClick={e => this.handleSubmit(e, emailRecipient)}
                                    type="submit"
                                >
                                    Senden
                                </button>
                            </FormGroup>
                        </Form>
                    )
                }
            </>
        );

        return (
            <div className="c-contact">
                {!formSent ? contactForm : formSentFeedback}
                {formError && formErrorFeedback}
            </div>
        );
    }
}

ContactModule.propTypes = {
    emailRecipient: PropTypes.string.isRequired,
};

export default ContactModule;
