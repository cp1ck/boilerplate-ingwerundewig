import BaseMedia from './BaseMedia';
import BaseModule from './BaseModule';

class BadgeItem {
    constructor(data) {
        this.icon = new BaseMedia(data);
        this.id = data.sys.id;
        this.url = data.fields.description;
    }

    getId() {
        return this.id;
    }

    getIcon() {
        return this.icon;
    }

    getUrl() {
        return this.url;
    }
}

export default class BadgesModule extends BaseModule {
    className = 'BadgesModule';

    constructor(data) {
        super(data);
        const {
            logos
        } = data.fields;
        this.logos = logos ? logos.map(logo => new BadgeItem(logo)) : null;
    }

    getLogos() {
        return this.logos;
    }
}
