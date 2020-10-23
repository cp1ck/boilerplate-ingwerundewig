export default class NavigationItem {
    constructor(data) {
        if (data.fields) {
            const {
                title,
                path
            } = data.fields;
            this.id = data.sys.id;
            this.path = path;
            this.title = title;
        }
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getPath() {
        return this.path;
    }
}
