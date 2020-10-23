import BaseModule from './BaseModule';
import BaseMedia from './BaseMedia';

export default class MetadataModule extends BaseModule {
    className = 'MetadataModule';

    constructor(data) {
        super(data);
        const {
            metadataDescription, metadataImage, metadataTitle,
            teaserDescription, teaserImage, teaserTitle,
            title
        } = data.fields;

        const fallbackImage = {
            fields: {
                name: 'Logo192',
                title: 'Logo192',
                file: {
                    url: 'https://via.placeholder.com/192.png',
                    details: {
                        image: {
                            height: 192,
                            width: 192
                        }
                    }
                }
            },
            sys: {
                id: 'Logo192'
            }
        };

        this.description = metadataDescription || teaserDescription || '';
        this.image = metadataImage || teaserImage || fallbackImage;
        this.title = metadataTitle || teaserTitle || title || '';
    }

    getDescription() {
        return this.description;
    }

    getImage() {
        return new BaseMedia(this.image);
    }

    getTitle() {
        return this.title;
    }
}
