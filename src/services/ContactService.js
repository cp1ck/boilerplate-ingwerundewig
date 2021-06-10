/* eslint-disable class-methods-use-this */

export default class ContactService {
    constructor() {
        this.endpoint = process.env.REACT_APP_NOTIFICATION_SERVICE_ENDPOINT;
    }

    async sendMessage(
        emailRecipient, form
    ) {
        const response = await fetch(`${this.endpoint}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailRecipient,
                form
            })
        });
        const data = await response.json();
        if (!data) {
            throw new Error('Something went wrong');
        }
        return data;
    }
}
