import path from "path";

export default class DB {
    private static instance: DB;
    private static data: any;
    private static db_path: string = process.env.DATABASE || "example_db.json";

    private constructor() {
        // Private constructor to prevent direct instantiation
        DB.data = path.resolve(process.cwd(), DB.db_path);
    }

    public static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        try {
            DB.data = DB.read_json_file(DB.db_path);
        } catch (error) {
            console.error("Error initializing database:", error);
            DB.data = { drivers: [] }; // Initialize with empty data if there's an error
        }
        return DB.instance;
    }

    /**
     * Reads the data from a JSON file and returns it as an object.
     * @param filePath string
     * @returns 
     */
    private static read_json_file(filePath: string): any {
        const fs = require("fs");
        try {
            const data = fs.readFileSync(filePath, "utf8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error reading JSON file:", error);
            return { message: "Error reading JSON file" };
        }
    }

    /**
     * Writes data to a JSON file.
     * @param filePath string
     * @param data any
     */
    private static write_json_file(filePath: string, data: any): void {
        const fs = require("fs");
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        } catch (error) {
            console.error("Error writing JSON file:", error);
        }
    }

    /**
     * Returns the data from the database.
     * @returns any
     */
    public getData(): any {
        return DB.data;
    }

    /**
     * Updates the data in the database.
     * @param newData any
     */
    public updateData(newData: any): void {
        DB.data = newData;
        DB.write_json_file(DB.db_path, newData);
    }

}
