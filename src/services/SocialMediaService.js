/* eslint-disable no-console */
const { REACT_APP_INSTAGRAM_SERVICE_ENDPOINT } = process.env;
export default class SocialMediaService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async fetchInstagramFeed() {
        try {
            const response = await fetch(REACT_APP_INSTAGRAM_SERVICE_ENDPOINT, {
                method: 'GET'
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error while fetching insta feed', error);
            return null;
        }
    }

    async getSocialFeeds() {
        try {
            const response = await fetch(`${this.endpoint}/socials`, {
                method: 'GET'
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error while socials feed fetching:', error);
            return null;
        }
    }

    async getLastTweet(userName) {
        try {
            const response = await fetch(`${this.endpoint}/twitter/lasttweet/${userName}`, {
                method: 'GET'
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error while Twitter feed fetching:', error);
            return null;
        }
    }

    async getGithubStats() {
        try {
            const response = await fetch(`${this.endpoint}/github`, {
                method: 'GET'
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error while Github stats fetching:', error);
            return null;
        }
    }
}
