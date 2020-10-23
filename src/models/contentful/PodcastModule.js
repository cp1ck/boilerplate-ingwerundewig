import BaseModule from './BaseModule';

export default class PodcastModule extends BaseModule {
    className = 'PodcastModule';

    constructor(data) {
        super(data);
        this.url = data.fields.url;
    }

    getUrl() {
        return this.url;
    }
}
