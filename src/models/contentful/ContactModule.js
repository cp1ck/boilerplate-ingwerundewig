
import BaseModule from './BaseModule';

export default class ContactModule extends BaseModule {
    className = 'ContactModule';

    constructor(entry) {
        super(entry);
        this.emailRecipient = entry.fields.extension.value;
    }

    getEmailRecipient() {
        return this.emailRecipient;
    }
}
