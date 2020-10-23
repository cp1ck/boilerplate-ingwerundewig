
import BaseMedia from './BaseMedia';
import BaseModule from './BaseModule';

class AccordionItem {
    constructor(data) {
        this.id = data.sys.id;
        const {
            image,
            name,
            text
        } = data.fields;
        this.name = name;
        if (image) {
            this.image = new BaseMedia(image);
        }
        this.text = text;
    }

    getImage() {
        return this.image;
    }

    getName() {
        return this.name;
    }

    getText() {
        return this.text;
    }
}

export default class AccordionModule extends BaseModule {
    className = 'AccordionModule';

    constructor(data) {
        super(data);
        const { accordionItems } = data.fields;
        this.accordionItems = accordionItems.map(entry => new AccordionItem(entry));
    }

    getContent() {
        return this.accordionItems;
    }
}
