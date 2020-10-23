const recursiveGet = (obj, keys) => {
    const o = {
        ...obj
    };

    if (keys.length > 1) {
        return recursiveGet(o[keys[0]], keys.slice(1));
    }

    if (keys.length === 1) {
        return o[keys[0]];
    }

    return o;
};

const recursiveSet = (obj, value, keys) => {
    const o = {
        ...obj
    };
    let v = value;
    if (keys.length > 1) {
        v = recursiveSet(o[keys[0]], value, keys.slice(1));
    }
    return {
        ...o,
        [keys[0]]: v
    };
};

export default class Cache {
    constructor() {
        this.data = {};
    }

    get(...keys) {
        return recursiveGet(this.data, keys);
    }

    set(value, ...keys) {
        this.data = recursiveSet(this.data, value, keys);
    }

    flush() {
        this.data = {};
    }
}
