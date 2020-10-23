import Socials from './SocialsModel';
import BaseModule from './BaseModule';
import BaseMedia from './BaseMedia';

export default class TeamMember extends BaseModule {
    constructor(data) {
        super(data);
        const {
            bio,
            image,
            name,
            position,
            socials,
        } = data.fields;
        this.bio = bio;
        this.id = data.sys.id;
        if (image) {
            this.image = new BaseMedia(image);
        }
        this.name = name;
        this.position = position;
        if (socials && socials.fields) {
            this.socials = new Socials(socials);
        }
    }

    getBio() {
        return this.bio;
    }

    getId() {
        return this.id;
    }

    getImage() {
        return this.image;
    }

    getName() {
        return this.name;
    }

    getPosition() {
        return this.position;
    }

    getSocials() {
        if (this.socials) {
            return this.socials.getSocials();
        }
        return null;
    }
}
