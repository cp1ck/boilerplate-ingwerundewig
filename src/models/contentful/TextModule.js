import BaseModule from './BaseModule';

export default class TextModule extends BaseModule {
    className = 'TextModule';

    constructor(data) {
        super(data);
        this.id = data.sys.id;
        const { text } = data.fields;
        this.text = text;
    }

    getText() {
        return this.text;
    }
}
