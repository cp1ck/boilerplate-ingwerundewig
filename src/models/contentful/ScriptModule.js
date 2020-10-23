
import BaseModule from './BaseModule';

export default class ScriptModule extends BaseModule {
    className = 'ScriptModule';

    constructor(entry) {
        super(entry);
        this.script = entry.fields.extension.value;
    }

    getScript() {
        return this.script;
    }
}
