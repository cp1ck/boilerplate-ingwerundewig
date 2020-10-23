class LocalStorageBackup {
    static data = {};

    static getItem(key) {
        return LocalStorageBackup.data[key];
    }

    static removeItem(key) {
        delete LocalStorageBackup.data[key];
    }

    static setItem(key, value) {
        LocalStorageBackup.data[key] = value;
    }
}

const getStorage = () => {
    try {
        return window.localStorage;
    } catch (e) {
        return LocalStorageBackup;
    }
};

const storage = getStorage();

export default storage;
