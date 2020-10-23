
import BaseModule from './BaseModule';

export default class FourColumnsModule extends BaseModule {
    className = 'FourColumnsModule';

    constructor(entry, data) {
        super(entry);
        this.left = data.left;
        this.leftCenter = data.leftCenter;
        this.rightCenter = data.rightCenter;
        this.right = data.right;
        this.columnsSize = entry.fields.columnsSize;
    }

    getLeftColumn() {
        return this.left;
    }


    getLeftCenterColumn() {
        return this.leftCenter;
    }

    getRightCenterColumn() {
        return this.rightCenter;
    }

    getRightColumn() {
        return this.right;
    }

    getColumnsSize() {
        const sizes = this.columnsSize ? this.columnsSize.split(' | ') : [null, null, null, null];
        const calcSize = (size) => {
            if (size) {
                const res = Math.round(size * 12 / 100);
                if (res === 5) {
                    return '6';
                }
                return `${res}`;
            }
            return '3';
        };
        return sizes.map(s => calcSize(s));
    }
}
