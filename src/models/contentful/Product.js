import BaseModule from './BaseModule';
import BaseMedia from './BaseMedia';

export default class Product extends BaseModule {
    className = 'Product';

    constructor(data) {
        super(data);
        const {
            description,
            image,
            price,
        } = data.fields;
        this.price = price;
        this.image = new BaseMedia(image);
        this.description = description;
    }

    getPrice() {
        return this.price;
    }

    getImage() {
        return this.image;
    }

    getDescription() {
        return this.description;
    }

}
