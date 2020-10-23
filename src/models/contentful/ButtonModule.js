import BaseModule from './BaseModule';

export default class ButtonModule extends BaseModule {
    className = 'ButtonModule';

    constructor(data) {
        super(data);
        const { text, url, isExternal } = data.fields;
        this.isExternal = isExternal;
        this.text = text;
        this.url = url;
    }

    getIsExternal() {
        return !!this.isExternal;
    }

    getText() {
        return this.text;
    }

    getUrl() {
        return this.url;
    }
}
