/* eslint-disable no-console */
export default class SocialMediaService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async fetchInstagramFeed(username) {
        const result = await fetch(`https://www.instagram.com/${username}/?__a=1`);
        const json = await result.json();
        const { edges } = json.graphql.user.edge_owner_to_timeline_media;
        const nicePost = (media) => {
            const post = {
                // caption: media.edge_media_to_caption.edge[0].text,
                src: media.display_url,
                id: media.shortcode,
                isVideo: media.is_video,
            };
            return post;
        };

        const posts = edges.map((item) => {
            const media = item.node;
            if (media.edge_sidecar_to_children) {
                return media.edge_sidecar_to_children.edges
                    .map(element => nicePost(element.node));
            }
            return [nicePost(media)];
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
