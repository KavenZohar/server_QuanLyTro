import md5 from "md5";
import db from "../../db/db.js";
import log from "../../utils/logs.js";

const imgAuth = {
    key: async function () {
        // extract a part of the admin's encrypted password to use as an image key
        const user = await db.admins.findById(1);
        const imgKey_1 = user.password.slice(5, 23);
        const imgKey_2 = user.password.slice(8, 11);
        this.imgKey = md5(imgKey_1) + md5(imgKey_2);

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

export default imgAuth; // checkKey export to routes/imgRoutes.js, key export to db/models/