import BaseModule from './BaseModule';
import TeamMember from './TeamMember';

export default class Team extends BaseModule {
    className = 'Team';

    constructor(data) {
        super(data);
        const {
            members,
        } = data.fields;
        this.members = members.map(member => new TeamMember(member));
    }

    getMembers() {
        return this.members;
    }
}
