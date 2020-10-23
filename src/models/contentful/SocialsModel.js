import BaseModule from './BaseModule';

export default class Socials extends BaseModule {
    className = 'Socials';

    constructor(data) {
        super(data);
        if (data && data.fields) {
            const {
                facebookUrl,
                githubUrl,
                instagramUrl,
                linkedInUrl,
                spotifyUrl,
                steamUrl,
                title,
                tweet,
                twitterUrl,
                twitchUrl,
                xingUrl
            } = data.fields;

            this.id = data.sys.id;
            this.socials = {
                facebook: facebookUrl,
                github: githubUrl,
                instagram: instagramUrl,
                linkedIn: linkedInUrl,
                spotify: spotifyUrl,
                steam: steamUrl,
                lastTweet: tweet,
                twitter: twitterUrl,
                twitch: twitchUrl,
                xing: xingUrl,
            };
            this.title = title;
        }
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getSocials() {
        return this.socials;
    }
}
