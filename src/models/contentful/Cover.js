import BaseModule from './BaseModule';
import BaseMedia from './BaseMedia';
import ButtonModule from './ButtonModule';

export default class Cover extends BaseModule {
    className = 'CoverModule';

    constructor(data) {
        super(data);
        const {
            media, externVideoUrl, headline, subheadline, subline, cta
        } = data.fields;
        if (cta) {
            this.button = new ButtonModule(cta);
        }
        this.media = new BaseMedia(media, externVideoUrl);
        this.headline = headline;
        this.subheadline = subheadline;
        this.subline = subline;
    }

    getButton() {
        return this.button;
    }

    getHeadline() {
        return this.headline;
    }

    getMedia() {
        return this.media;
    }

    getSubheadline() {
        return this.subheadline;
    }

    getSubline() {
        return this.subline;
    }
}
