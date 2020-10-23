import SocialMediaService from '../services/SocialMediaService';

export default class SocialMediaRepository {
    constructor(endpoint) {
        this.service = new SocialMediaService(endpoint);
    }

    async getGithubStats() {
        return this.service.getGithubStats();
    }

    async getSocialFeeds() {
        return this.service.getSocialFeeds();
    }
}
