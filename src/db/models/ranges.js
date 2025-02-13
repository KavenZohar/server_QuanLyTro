import pgPool from "../connection.js";
import log from "../../utils/logs.js";

const ranges = {
    find: async function (rangesId) {
        try {
            const result = await pgPool.query("SELECT * FROM ranges WHERE id = $1",
            [
                rangesId
            ]); // retrieve a range by id

            const range = result.rows[0];
            if (range) {
                return range;
            } else {
                return null;
            }

        } catch (error) {
            log.dbErrors(error.message);
        }
    },


    getAll: async function () {
        try {
            const result = await pgPool.query("SELECT id, name FROM ranges ORDER BY id ASC");
            return result.rows;
        } catch (error) {
            log.dbErrors(error.message);
        }
    }

}

export default ranges;