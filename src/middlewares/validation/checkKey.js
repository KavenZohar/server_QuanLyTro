import { imgKey } from "../../configs/config.js";
import log from "../../utils/logs.js";

const checkImgKey = (req, res, next) => {
    const base64Key = req.query.key.replace(/[^A-Za-z0-9+/=]/g, '');

    try {
        const imageKey = atob(base64Key);
        if (imageKey === imgKey) {
            next();
        } else {
            res.status(403).send("Access Denied");
        }
    } catch (error) {
        log.StrangeRequest(req);
        log.ErrorServer(error.message);
        console.error(error.message);
        res.status(403).send("Access Denied");
    }
};

export {
    checkImgKey
};