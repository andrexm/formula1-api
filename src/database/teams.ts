import Team, { TeamDTO } from "../Types/team";
import Database from "./db";

export default class TeamsModel {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    /**
     * Get all teams from the database.
     * @returns Team[]
     */
    public getTeams(): Team[] {
        return this.db.getData().teams;
    }

    /**
     * Get a team by its ID.
     * @param id number
     * @returns Team | undefined
     */
    public getTeamById(id: number): Team | undefined {
        const teams: Team[] = this.db.getData().teams;
        return teams.find((team: Team) => team.id === id);
    }

    /**
     * Create a new team and add it to the database.
     * @param teamData TeamDTO
     * @returns Team
     */
    public createTeam(teamData: TeamDTO): Team {
        const data = this.db.getData();
        const newTeam: Team = { id: Date.now(), ...teamData };
        data.teams.push(newTeam);
        this.db.updateData(data);
        return newTeam;
    }

    /**
     * Update a team in the database.
     * @param id number
     * @param teamData TeamDTO
     * @returns boolean | Team
     */
    public updateTeam(id: number, teamData: TeamDTO): boolean|Team {
        const data = this.db.getData();
        const teamIndex = data.teams.findIndex((team: Team) => team.id === id);
        
        if (teamIndex === -1) {
            return false;
        }

        data.teams[teamIndex] = { id, ...teamData };
        this.db.updateData(data);
        return data.teams[teamIndex];
    }

    /**
     * Delete a team from the database.
     * @param id number
     * @returns boolean
     */
    public deleteTeam(id: number): boolean {
        const data = this.db.getData();
        const teamIndex: number = data.teams.findIndex((team: Team) => team.id === id);
        
        if (teamIndex === -1) {
            return false;
        }

        data.teams.splice(teamIndex, 1);
        this.db.updateData(data);
        return true;
    }
}