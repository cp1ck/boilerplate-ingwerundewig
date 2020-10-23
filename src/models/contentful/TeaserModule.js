import BaseModule from './BaseModule';
import BaseMedia from './BaseMedia';

export default class TeaserModule extends BaseModule {
    className = 'TeaserModule';

    constructor(data) {
        super(data);
        const {
            path, teaserDescription, teaserImage, teaserTitle
        } = data.fields;
        this.description = teaserDescription;
        if (teaserImage) {
            this.image = new BaseMedia(teaserImage);
        }
        this.path = path;
        this.title = teaserTitle;
    }

    getDescription() {
        return this.description;
    }

    getImage() {
        return this.image;
    }

    getPath() {
        return this.path;
    }

    getTitle() {
        return this.title;
    }
}
