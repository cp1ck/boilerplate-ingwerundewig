/* eslint-disable class-methods-use-this */

export default class MockNotificationService {
    async sendMessage(name, email, message) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (!name || !email || !message) {
            throw new Error('Invalid Request');
        }

        return {
            success: true,
            message: 'MAIL_SENT'
        };
    }
}
