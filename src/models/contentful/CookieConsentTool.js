import BaseModule from './BaseModule';

export default class CookieConsentTool extends BaseModule {
    className = 'CookieConsentTool';

    constructor(data) {
        super(data);
        const {
            buttonText, linkText, linkUrl, text
        } = data.fields;
        this.buttonText = buttonText;
        this.linkText = linkText;
        this.linkUrl = linkUrl;
        this.text = text;
    }

    getButtonText() {
        return this.buttonText;
    }

    getLinkText() {
        return this.linkText;
    }

    getLinkUrl() {
        return this.linkUrl;
    }

    getText() {
        return this.text;
    }
}
