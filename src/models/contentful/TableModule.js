
import BaseModule from './BaseModule';

export default class TableModule extends BaseModule {
    className = 'TableModule';

    constructor(data) {
        super(data);
        this.text = data.fields.text;
    }

    getText() {
        return this.text;
    }
}
