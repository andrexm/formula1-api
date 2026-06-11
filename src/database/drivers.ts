import Driver, { DriverDTO } from "../Types/driver";
import Database from "./db";

export default class DriversModel {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    /**
     * Get all drivers from the database.
     * @returns Driver[]
     */
    public getDrivers(): Driver[] {
        return this.db.getData().drivers;
    }

    /**
     * Get a driver by its ID.
     * @param id number
     * @returns Driver | undefined
     */
    public getDriverById(id: number): Driver | undefined {
        const drivers: Driver[] = this.db.getData().drivers;
        return drivers.find((driver: Driver) => driver.id === id);
    }

    /**
     * Create a new driver and add it to the database.
     * @param driverData DriverDTO
     * @returns Driver
     */
    public createDriver(driverData: DriverDTO): Driver {
        const data = this.db.getData();
        const newDriver: Driver = { id: Date.now(), ...driverData };
        data.drivers.push(newDriver);
        this.db.updateData(data);
        return newDriver;
    }

    /**
     * Update a driver in the database.
     * @param id number
     * @param driverData DriverDTO
     * @returns boolean | Driver
     */
    public updateDriver(id: number, driverData: DriverDTO): boolean|Driver {
        const data = this.db.getData();
        const driverIndex = data.drivers.findIndex((driver: Driver) => driver.id === id);
        
        if (driverIndex === -1) {
            return false;
        }

        data.drivers[driverIndex] = { id, ...driverData };
        this.db.updateData(data);
        return data.drivers[driverIndex];
    }

    /**
     * Delete a driver from the database.
     * @param id number
     * @returns boolean
     */
    public deleteDriver(id: number): boolean {
        const data = this.db.getData();
        const driverIndex: number = data.drivers.findIndex((driver: Driver) => driver.id === id);
        
        if (driverIndex === -1) {
            return false;
        }

        data.drivers.splice(driverIndex, 1);
        this.db.updateData(data);
        return true;
    }
}