import db from "../../db/db.js";
import log from "../../utils/logs.js";

const imgAuth = {
    key: async function () {
        // extract a part of the admin's encrypted password to use as an image key
        const user = await db.admins.findById(1);
        this.imgKey = user.password.slice(8, 21);

        // re-encrypt the key
        const base64Key = btoa(this.imgKey);

        return base64Key;
    },

    checkKey: function () {
        return async (req, res, next) => {
            const base64Key = req.query.key; // get the key
            const hashKey = this.imgKey; // get admin's key
            if (!base64Key) return res.status(403).send("Access Denied"); // if base64 does not exist
        
            try {
                const imageKey = atob(base64Key); // decode base64, return key
                if (imageKey === hashKey) {
                    next();
                } else {
                    res.status(403).send("Access Denied");
                }
            } catch (error) {
                // save error
                log.StrangeRequest(req);
                log.ErrorServer(error.message);
        
                // return 403
                res.status(403).send("Access Denied");
            }
        };
    }
}

export default imgAuth;