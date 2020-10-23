export default class BaseModule {
    className = 'BaseModule';

    constructor(data) {
        this.id = data.sys.id;
        const { name, theme } = data.fields;
        this.name = name;
        this.theme = theme;
    }

    getId() {
        const id = `${this.id}${Math.floor(Math.random() * 1000)}`;
        return id;
    }

    getName() {
        return this.name;
    }

    getTheme() {
        return this.theme || '';
    }
}
