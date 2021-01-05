import BaseModule from './BaseModule';

export default class Shop extends BaseModule {
    className='Shop';

    constructor(data) {
        super(data);
        this.paypalClientId = data.fields.paypalClientId;
    }

    getPaypalClientId() {
        return this.paypalClientId;
    }
}
