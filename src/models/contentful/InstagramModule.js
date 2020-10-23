
import BaseModule from './BaseModule';

export default class InstagramModule extends BaseModule {
    className = 'InstagramModule';

    constructor(entry) {
        super(entry);
        this.username = entry.fields.extension.value;
    }

    getUsername() {
        return this.username;
    }
}
