import BaseModule from './BaseModule';

export default class BaseMedia extends BaseModule {
    className = 'BaseMedia';

    constructor(data, externVideo = null) {
        super(data);
        const {
            description,
            file,
            title
        } = data.fields;
        const name = file && file.fileName ? file.fileName : '';
        this.alt = title || description || name;
        this.description = description;
        this.url = file.url;
        this.video = externVideo;
        if (file && file.details.image) {
            this.height = file.details.image.height;
            this.width = file.details.image.width;
        }
    }

    getAlt() {
        return this.alt;
    }

    getDescription() {
        return this.description;
    }

    getImageUrl() {
        return this.url;
    }

    getVideoUrl() {
        return this.video;
    }

    isVideo() {
        return !!this.video;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }
}
