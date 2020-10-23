
import BaseModule from './BaseModule';

export default class TwoColumnsModule extends BaseModule {
    className = 'TwoColumnsModule';

    constructor(entry, data) {
        super(entry);
        this.left = data.left;
        this.right = data.right;
        this.columnsSize = entry.fields.columnsSize;
    }

    getLeftColumn() {
        return this.left;
    }

    getRightColumn() {
        return this.right;
    }

    getColumnsSize() {
        const sizes = this.columnsSize ? this.columnsSize.split(' | ') : [null, null];
        const calcSize = (size) => {
            if (size) {
                return `${Math.round(size * 12 / 100)}`;
            }
            return '6';
        };
        return sizes.map(s => calcSize(s));
    }
}
