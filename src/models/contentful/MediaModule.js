import BaseModule from './BaseModule';
import BaseMedia from './BaseMedia';

export default class MediaModule extends BaseModule {
    className = 'MediaModule';

    constructor(data) {
        super(data);
        const { displayOptions, media } = data.fields;
        this.media = media;
        this.displayOptions = displayOptions;
    }

    getMedia() {
        return this.media.map(entry => new BaseMedia(entry));
    }

    getDisplayOptions() {
        return this.displayOptions;
    }
}
