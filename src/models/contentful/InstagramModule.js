
import BaseModule from './BaseModule';

export default class InstagramModule extends BaseModule {
    className = 'InstagramModule';

    constructor(entry) {
        super(entry);
        this.token = entry.fields.extension.value;
    }

    getToken() {
        return this.token;
    }
}
