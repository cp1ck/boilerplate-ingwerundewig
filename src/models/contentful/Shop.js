import BaseModule from './BaseModule';
import Product from './Product';

export default class Shop extends BaseModule {
    className = 'Shop';

    constructor(data) {
        super(data);
        const {
            inStock,
            products
        } = data.fields;
        this.products = products.map(product => new Product(product));
        this.inStock = inStock;
    }

    getIsInStock() {
        return this.inStock;
    }

    getProducts() {
        return this.products;
    }
}
