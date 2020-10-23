import BaseModule from './BaseModule';

export default class QuoteModule extends BaseModule {
    className = 'QuoteModule';

    constructor(data) {
        super(data);
        const {
            authorName,
            authorOccupation,
            text
        } = data.fields;
        this.authorName = authorName;
        this.authorOccupation = authorOccupation;
        this.text = text;
    }

    getAuthorName() {
        return this.authorName;
    }

    getAuthorOccupation() {
        return this.authorOccupation;
    }

    getText() {
        return this.text;
    }
}
