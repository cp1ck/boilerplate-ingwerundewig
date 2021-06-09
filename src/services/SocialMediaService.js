/* eslint-disable no-console */
export default class SocialMediaService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async fetchInstagramFeed(token) {
        const result = await fetch(`https://graph.instagram.com/me/media?access_token=${token}&fields=media_url,media_type,caption,permalink,children{id,media_url, media_type, permalink}`);
        const json = await result.json();
        const { data } = json;
        const nicePost = (media) => {
            const post = {
                // caption: media.edge_media_to_caption.edge[0].text,
                src: media.media_url,
                id: media.id,
                isVideo: media.media_type === 'VIDEO',
                permalink: media.permalink
            };
            return post;
        };

        const posts = data.map((item) => {
            if (item.media_type === 'CAROUSEL_ALBUM') {
                return item.children.data
                    .map(element => nicePost(element));
            }
            return [nicePost(item)];
        });
        return posts;
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
