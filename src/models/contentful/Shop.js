import BaseModule from './BaseModule';
import Product from './Product';

export default class Shop extends BaseModule {
    className='Shop';

    constructor(data) {
        super(data);
        const {
            products
        } = data.fields;
        this.products = products.map(product => new Product(product));
    }

    getProducts() {
        return this.products;
    }
}
