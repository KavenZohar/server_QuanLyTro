import { imgKey } from "../../configs/config.js";
import log from "../../utils/logs.js";

const checkImgKey = (req, res, next) => {
    const base64Key = req.query.key; // get the key

    try {
        const imageKey = atob(base64Key); // decode base64, return key
        if (imageKey === imgKey) {
            next();
        } else {
            res.status(403).send("Access Denied");
        }
    } catch (error) {
        // save error
        log.StrangeRequest(req);
        log.ErrorServer(error.message);
        console.error(error.message);

        // return 403
        res.status(403).send("Access Denied");
    }
};

export {
    checkImgKey
};