import TeamsModel from "../database/teams";

export default class Teams {
    private static db: TeamsModel = new TeamsModel();

    /**
     * Get all drivers
     * @param req
     * @param res
     */
    public static async getAllTeams(req: any, res: any) {
            //const data = Teams.db.getTeams();
            const data = Teams.db.getTeams();
            return data;
            res.code(200)
            return { message: "All teams retrieved successfully", data: data };
    }

    /**
     * Get team by id
     * @param req
     * @param res
     */
    public static async getTeamById(req: any, res: any) {
        try {
            const teamId = req.params.id;
            const team = Teams.db.getTeamById(parseInt(teamId));

            if (!team) {
                res.code(404)
                return { message: `Team with id ${teamId} not found` };
            }

            res.code(200)
            return { message: `Team with id ${teamId} retrieved successfully`, data: team };
        } catch (error) {
            res.code(500)
            return { message: "Error retrieving team", error };
        }
    }

    /**
     * Create a new team
     * @param req
     * @param res
     */
    public static async createTeam(req: any, res: any) {
        try {
            const teamData = req.body;
            const newTeam = Teams.db.createTeam(teamData);
            res.code(201)
            return { message: "Team created successfully", data: newTeam };
        } catch (error) {
            res.code(500)
            return { message: "Error creating team", error };
        }
    }

    /**
     * Update a team
     * @param req
     * @param res
     */
    public static async updateTeam(req: any, res: any) {
        try {
            const teamId = req.params.id;
            const teamData = req.body;

            Teams.db.updateTeam(parseInt(teamId), teamData);
            res.code(200)
            return { message: `Team with id ${teamId} updated successfully`, data: teamData };
        } catch (error) {
            res.code(500)
            return { message: "Error updating team", error };
        }
    }

    /**
     * Delete a team
     * @param req
     * @param res
     */
    public static async deleteTeam(req: any, res: any) {
        try {
            const teamId = req.params.id;

            Teams.db.deleteTeam(parseInt(teamId));
            res.code(200)
            return { message: `Team with id ${teamId} deleted successfully` };
        } catch (error) {
            res.code(500)
            return { message: "Error deleting team", error };
        }
    }
}