import DriversModel from "../database/drivers";

export default class Drivers {
    private static db: DriversModel = new DriversModel();

    /**
     * Get all drivers
     * @param req
     * @param res
     */
    public static async getAllDrivers(req: any, res: any) {
            //const data = Drivers.db.getDrivers();
            const data = Drivers.db.getDrivers();
            return data;
            res.code(200)
            return { message: "All drivers retrieved successfully", data: data };
    }

    /**
     * Get driver by id
     * @param req
     * @param res
     */
    public static async getDriverById(req: any, res: any) {
        try {
            const driverId = req.params.id;
            const driver = Drivers.db.getDriverById(parseInt(driverId));

            if (!driver) {
                res.code(404)
                return { message: `Driver with id ${driverId} not found` };
            }

            res.code(200)
            return { message: `Driver with id ${driverId} retrieved successfully`, data: driver };
        } catch (error) {
            res.code(500)
            return { message: "Error retrieving driver", error };
        }
    }

    /**
     * Create a new driver
     * @param req
     * @param res
     */
    public static async createDriver(req: any, res: any) {
        try {
            const driverData = req.body;
            const newDriver = Drivers.db.createDriver(driverData);
            res.code(201)
            return { message: "Driver created successfully", data: newDriver };
        } catch (error) {
            res.code(500)
            return { message: "Error creating driver", error };
        }
    }

    /**
     * Update a driver
     * @param req
     * @param res
     */
    public static async updateDriver(req: any, res: any) {
        try {
            const driverId = req.params.id;
            const driverData = req.body;

            Drivers.db.updateDriver(parseInt(driverId), driverData);
            res.code(200)
            return { message: `Driver with id ${driverId} updated successfully`, data: driverData };
        } catch (error) {
            res.code(500)
            return { message: "Error updating driver", error };
        }
    }

    /**
     * Delete a driver
     * @param req
     * @param res
     */
    public static async deleteDriver(req: any, res: any) {
        try {
            const driverId = req.params.id;

            Drivers.db.deleteDriver(parseInt(driverId));
            res.code(200)
            return { message: `Driver with id ${driverId} deleted successfully` };
        } catch (error) {
            res.code(500)
            return { message: "Error deleting driver", error };
        }
    }
}