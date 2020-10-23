
import BaseModule from './BaseModule';

export default class ThreeColumnsModule extends BaseModule {
    className = 'ThreeColumnsModule';

    constructor(entry, data) {
        super(entry);
        this.left = data.left;
        this.center = data.center;
        this.right = data.right;
        this.columnsSize = entry.fields.columnsSize;
    }

    getLeftColumn() {
        return this.left;
    }

    getCenterColumn() {
        return this.center;
    }

    getRightColumn() {
        return this.right;
    }

    getColumnsSize() {
        const sizes = this.columnsSize ? this.columnsSize.split(' | ') : [null, null, null];
        const calcSize = (size) => {
            if (size) {
                return `${Math.round(size * 12 / 100)}`;
            }
            return '4';
        };
        return sizes.map(s => calcSize(s));
    }
}
