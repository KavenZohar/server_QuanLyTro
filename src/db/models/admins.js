import pgPool from "../connection.js";
import imgAuth from "../../middlewares/auth/imgAuth.js";
import log from "../../utils/logs.js";

const admins = {
    findByUsername: async function (username) {
        try {
            const result = await pgPool.query("SELECT * FROM admins WHERE username = $1",
                [
                    username
                ]);

            const user = result.rows[0];
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            log.dbErrors(error.message);
        } finally {
            
        }
    },


    findById: async function (id) {
        try {
            const result = await pgPool.query("SELECT * FROM admins WHERE id = $1",
                [
                    id
                ]);

            const user = result.rows[0];
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            log.dbErrors(error.message);
        }
    },


    getInfoById: async function (id) {
        try {
            // get img key
            const imgKey = await imgAuth.key();

            const result = await pgPool.query("SELECT * FROM admins_info WHERE id = $1",
                [
                    id
                ]);
            
            const info = result.rows[0];

            // combine into a complete URL
            const infoData = {
                ...info,
                avatar_url: info.avatar_url + "?key=" + imgKey
            }
            if (info) {
                return infoData;
            } else {
                return null;
            }
        } catch (error) {
            log.dbErrors(error.message);
        }
    }

}

export default admins; // export to db.js