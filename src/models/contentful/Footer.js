import BaseModule from './BaseModule';
import BaseMedia from './BaseMedia';
import NavigationItemModel from './NavigationItemModel';
import Socials from './SocialsModel';

export default class Footer extends BaseModule {
    constructor(data) {
        super(data);
        const {
            brandName,
            displayOptions,
            logo,
            menu,
            socials,
        } = data.fields;
        this.menu = menu;
        if (logo) {
            this.logo = new BaseMedia(logo);
        }
        if (socials) {
            this.socials = new Socials(socials);
        }
        this.displayOptions = displayOptions;
        this.brandName = brandName;
    }

    getNavigation() {
        if (this.menu) {
            return this.menu
                .map(entry => (entry && entry.fields ? new NavigationItemModel(entry) : null))
                .filter(entry => entry);
        }
        return null;
    }

    getLogo() {
        return this.logo ? this.logo : null;
    }

    getName() {
        return this.brandName;
    }

    getSocials() {
        return this.socials ? this.socials.getSocials() : null;
    }

    getDisplayOptions() {
        return this.displayOptions;
    }
}
